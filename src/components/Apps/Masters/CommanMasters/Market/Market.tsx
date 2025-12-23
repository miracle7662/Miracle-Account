import React, { useState, useCallback, useEffect } from 'react';
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';
import { Preloader } from '@/components/Misc/Preloader';
import { Button, Card, Stack, Table } from 'react-bootstrap';
import TitleHelmet from '@/components/Common/TitleHelmet';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';

// Define market data type
interface MarketItem {
  id: string;
  marketId: string;
  marketName: string;
}

// Sample market data based on the screenshot
const initialMarketItems: MarketItem[] = [
  { id: '1', marketId: '66922908', marketName: 'India' },
];

// AddMarketModal component
const AddMarketModal: React.FC<{
  show: boolean;
  onHide: () => void;
  onAddMarket: (marketData: Omit<MarketItem, 'id'>) => void;
}> = ({ show, onHide, onAddMarket }) => {
  const [marketId, setMarketId] = useState<string>('');
  const [marketName, setMarketName] = useState<string>('');

  if (!show) return null;

  const handleAdd = () => {
    if (!marketId.trim() || !marketName.trim()) {
      toast.error('Market ID and Market Name are required');
      return;
    }

    onAddMarket({
      marketId,
      marketName,
    });

    // Reset form
    setMarketId('');
    setMarketName('');
    onHide();
  };

  return (
    <div className="modal" style={{ display: 'block', background: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
      <div className="modal-content" style={{ background: 'white', padding: '20px', maxWidth: '500px', margin: '100px auto', borderRadius: '8px' }}>
        <h3>Add New Market</h3>
        {/* Row 1: Market ID */}
        <div className="mb-3">
          <label className="form-label">Market ID</label>
          <input
            type="text"
            className="form-control"
            value={marketId}
            onChange={(e) => setMarketId(e.target.value)}
            placeholder="e.g., 66922908"
          />
        </div>
        {/* Row 2: Market Name */}
        <div className="mb-3">
          <label className="form-label">Market Name</label>
          <input
            type="text"
            className="form-control"
            value={marketName}
            onChange={(e) => setMarketName(e.target.value)}
            placeholder="e.g., India"
          />
        </div>
        <div className="d-flex justify-content-end">
          <button className="btn btn-outline-secondary me-2" onClick={onHide}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

// EditMarketModal component
const EditMarketModal: React.FC<{
  show: boolean;
  onHide: () => void;
  market: MarketItem | null;
  onEditMarket: (id: string, updatedData: Omit<MarketItem, 'id'>) => void;
}> = ({ show, onHide, market, onEditMarket }) => {
  const [marketId, setMarketId] = useState<string>('');
  const [marketName, setMarketName] = useState<string>('');

  useEffect(() => {
    if (market) {
      setMarketId(market.marketId);
      setMarketName(market.marketName);
    }
  }, [market]);

  if (!show || !market) return null;

  const handleEdit = () => {
    if (!marketId.trim() || !marketName.trim()) {
      toast.error('Market ID and Market Name are required');
      return;
    }

    onEditMarket(market.id, {
      marketId,
      marketName,
    });

    onHide();
  };

  return (
    <div className="modal" style={{ display: 'block', background: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
      <div className="modal-content" style={{ background: 'white', padding: '20px', maxWidth: '500px', margin: '100px auto', borderRadius: '8px' }}>
        <h3>Edit Market</h3>
        {/* Row 1: Market ID */}
        <div className="mb-3">
          <label className="form-label">Market ID</label>
          <input
            type="text"
            className="form-control"
            value={marketId}
            onChange={(e) => setMarketId(e.target.value)}
            placeholder="e.g., 66922908"
          />
        </div>
        {/* Row 2: Market Name */}
        <div className="mb-3">
          <label className="form-label">Market Name</label>
          <input
            type="text"
            className="form-control"
            value={marketName}
            onChange={(e) => setMarketName(e.target.value)}
            placeholder="e.g., India"
          />
        </div>
        <div className="d-flex justify-content-end">
          <button className="btn btn-outline-secondary me-2" onClick={onHide}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleEdit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const MarketList: React.FC = () => {
  const [marketItems, setMarketItems] = useState<MarketItem[]>(initialMarketItems);
  const [loading, setLoading] = useState<boolean>(false);
  const [showAddMarketModal, setShowAddMarketModal] = useState(false);
  const [showEditMarketModal, setShowEditMarketModal] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState<MarketItem | null>(null);

  // Define columns for react-table
  const columns = React.useMemo<ColumnDef<MarketItem>[]>(
    () => [
      {
        id: 'actions',
        header: () => <div style={{ textAlign: 'center' }}>Action</div>, // Centered header
        size: 100,
        cell: ({ row }) => (
          <div className="d-flex gap-2 justify-content-center">
            <button
              className="btn btn-sm btn-success"
              style={{ padding: '4px 8px' }}
              onClick={() => handleEditMarketClick(row.original)}
            >
              <i className="fi fi-rr-edit"></i>
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleDeleteMarket(row.original)}
              style={{ padding: '4px 8px' }}
            >
              <i className="fi fi-rr-trash"></i>
            </button>
          </div>
        ),
      },
      {
        accessorKey: 'id',
        header: () => <div style={{ textAlign: 'center' }}>#</div>,
        size: 50,
        cell: (info) => <div style={{ textAlign: 'center' }}>{info.getValue<string>()}</div>,
      },
      {
        accessorKey: 'marketId',
        header: () => <div style={{ textAlign: 'center' }}>Market Id</div>,
        size: 150,
        cell: (info) => <div style={{ textAlign: 'center' }}>{info.getValue<string>()}</div>,
      },
      {
        accessorKey: 'marketName',
        header: () => <div style={{ textAlign: 'center' }}>Market Name</div>,
        size: 150,
        cell: (info) => <div style={{ textAlign: 'center' }}>{info.getValue<string>()}</div>,
      },
    ],
    []
  );

  // Initialize react-table
  const table = useReactTable({
    data: marketItems,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const handleAddMarket = useCallback((marketData: Omit<MarketItem, 'id'>) => {
    const newMarket: MarketItem = {
      id: (marketItems.length + 1).toString(),
      marketId: marketData.marketId,
      marketName: marketData.marketName,
    };

    const updatedMarketItems = [...marketItems, newMarket];
    setMarketItems(updatedMarketItems);
    toast.success('Market added successfully');
  }, [marketItems]);

  const handleEditMarketClick = useCallback((market: MarketItem) => {
    setSelectedMarket(market);
    setShowEditMarketModal(true);
  }, []);

  const handleEditMarket = useCallback((id: string, updatedData: Omit<MarketItem, 'id'>) => {
    const updatedMarketItems = marketItems.map((item) =>
      item.id === id
        ? {
            ...item,
            marketId: updatedData.marketId,
            marketName: updatedData.marketName,
          }
        : item
    );
    setMarketItems(updatedMarketItems);

    if (selectedMarket?.id === id) {
      setSelectedMarket({
        ...selectedMarket,
        marketId: updatedData.marketId,
        marketName: updatedData.marketName,
      });
    }

    toast.success('Market updated successfully');
  }, [marketItems, selectedMarket]);

  const handleDeleteMarket = useCallback((marketItem: MarketItem) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this market!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3E97FF',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        setTimeout(() => {
          const updatedMarkets = marketItems.filter((item) => item.id !== marketItem.id);
          setMarketItems(updatedMarkets);
          if (selectedMarket?.id === marketItem.id) {
            setSelectedMarket(null);
          }
          setLoading(false);
          toast.success('Market deleted successfully');
        }, 1500);
      }
    });
  }, [marketItems, selectedMarket]);

  return (
    <>
      <TitleHelmet title="Market List" />
      <Card className="m-1">
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
          <h4 className="mb-0">Market List</h4>
          <div style={{ display: 'flex', gap: '4px' }}>
            <Button variant="success" className="me-1" onClick={() => setShowAddMarketModal(true)}>
              <i className="bi bi-plus"></i> Add Market
            </Button>
          </div>
        </div>
        <div className="p-3">
          {loading ? (
            <Stack className="align-items-center justify-content-center flex-grow-1 h-100">
              <Preloader />
            </Stack>
          ) : (
            <div style={{ width: '100%', overflowX: 'auto' }}>
              <Table responsive className="mb-0" style={{ tableLayout: 'auto', width: '100%' }}>
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          colSpan={header.colSpan}
                          style={{
                            width: header.column.columnDef.size,
                            whiteSpace: 'normal',
                            padding: '8px',
                            textAlign: 'center',
                          }}
                        >
                          {header.isPlaceholder ? null : (
                            flexRender(header.column.columnDef.header, header.getContext())
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          style={{
                            whiteSpace: 'normal',
                            padding: '8px',
                            textAlign: 'center',
                          }}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      </Card>
      <AddMarketModal
        show={showAddMarketModal}
        onHide={() => setShowAddMarketModal(false)}
        onAddMarket={handleAddMarket}
      />
      <EditMarketModal
        show={showEditMarketModal}
        onHide={() => setShowEditMarketModal(false)}
        market={selectedMarket}
        onEditMarket={handleEditMarket}
      />
    </>
  );
};

export default MarketList;
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Button, Card, Form, Modal, Stack, Table, Spinner, Pagination, Row, Col } from 'react-bootstrap';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import { useAuthContext } from '@/common';

interface MainGroup {
  item_maingroupid: number;
  description: string;
  item_group_name: string;
}

interface Unit {
  unitid: number;
  description: string;
  unit_name: string;
}

interface Product {
  product_id: number;
  product_nameeg: string;
  product_namemg: string;
  item_maingroupid: number;
  unitid: number;
  hsn_code: string;
  gstrate: number;
  description: string;
  status: number;
  hotelid: number;
  companyid: number;
  yearid: number;
}

const PanItemMasters: React.FC = () => {
  const { user } = useAuthContext();
  const [mainGroups, setMainGroups] = useState<MainGroup[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const params = `?companyid=${user?.companyid || 0}&yearid=${user?.yearid || 0}`;
      const [mainGroupsRes, unitsRes, productsRes] = await Promise.all([
        axios.get(`/api/products/main-groups${params}`, {
          headers: {
            'Authorization': `Bearer ${user?.token}`,
          },
        }),
        axios.get(`/api/products/units${params}`, {
          headers: {
            'Authorization': `Bearer ${user?.token}`,
          },
        }),
        axios.get(`/api/products${params}`, {
          headers: {
            'Authorization': `Bearer ${user?.token}`,
          },
        }),
      ]);
      setMainGroups(mainGroupsRes.data);
      setUnits(unitsRes.data);
      setProducts(productsRes.data);
    } catch (error) {
      toast.error('Failed to fetch data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setShowEditModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  const closeEditModal = () => {
    setEditingProduct(null);
    setShowEditModal(false);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    setLoading(true);
    try {
      await axios.delete(`/api/products/${id}`, { 
        headers: {
          'Authorization': `Bearer ${user?.token}`,
        },
        data: { updated_by_id: user?.userid || 0 } 
      });
      toast.success('Product deleted successfully');
      fetchAllData();
    } catch (error) {
      toast.error('Failed to delete product');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const columns = React.useMemo<ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: 'product_id',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'product_nameeg',
        header: 'Product Name (EN)',
      },
      {
        accessorKey: 'product_namemg',
        header: 'Product Name (Local)',
      },
      {
        accessorKey: 'item_maingroupid',
        header: 'Main Group',
        cell: info => {
          const mg = mainGroups.find(m => m.item_maingroupid === info.getValue());
          return mg ? mg.item_group_name : '-';
        },
      },
      {
        accessorKey: 'unitid',
        header: 'Unit',
        cell: info => {
          const unit = units.find(u => u.unitid === info.getValue());
          return unit ? unit.unit_name : '-';
        },
      },
      {
        accessorKey: 'hsn_code',
        header: 'HSN Code',
      },
      {
        accessorKey: 'gstrate',
        header: 'GST Rate',
      },
      {
        accessorKey: 'description',
        header: 'Description',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: info => (info.getValue() === 1 ? 'Active' : 'Inactive'),
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <Stack direction="horizontal" gap={2}>
            <Button size="sm" variant="primary" onClick={() => openEditModal(row.original)}>
              Edit
            </Button>
            <Button size="sm" variant="danger" onClick={() => handleDelete(row.original.product_id)}>
              Delete
            </Button>
          </Stack>
        ),
      },
    ],
    [mainGroups, units]
  );

  const filteredProducts = React.useMemo(() => {
    if (!searchTerm) return products;
    const lower = searchTerm.toLowerCase();
    return products.filter(
      p =>
        p.product_nameeg.toLowerCase().includes(lower) ||
        (p.product_namemg && p.product_namemg.toLowerCase().includes(lower)) ||
        p.hsn_code.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower)
    );
  }, [products, searchTerm]);

  const table = useReactTable({
    data: filteredProducts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: searchTerm,
    },
    initialState: { pagination: { pageSize: 10 } },
  });

  const getPaginationItems = () => {
    const items = [];
    const maxPagesToShow = 5;
    const pageIndex = table.getState().pagination?.pageIndex || 0;
    const totalPages = table.getPageCount() || 1;
    let startPage = Math.max(0, pageIndex - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages - 1, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(0, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === pageIndex}
          onClick={() => table.setPageIndex(i)}
        >
          {i + 1}
        </Pagination.Item>
      );
    }
    return items;
  };

  return (
    <>
      <Card className="m-3">
        <Card.Body>
          <Stack direction="horizontal" className="mb-3 justify-content-between align-items-center">
            <h4 className="mb-0">Pan Item Master</h4>
            <Button variant="success" onClick={openAddModal} disabled={loading}>
              Add Product
            </Button>
          </Stack>
          <Form.Control
            type="search"
            placeholder="Search products"
            className="mb-3"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            disabled={loading}
          />
          {loading ? (
            <Stack className="align-items-center justify-content-center">
              <Spinner animation="border" role="status" />
            </Stack>
          ) : (
            <>
              <Table responsive bordered hover>
                <thead>
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <th key={header.id} style={{ width: header.column.columnDef.size }}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.length === 0 && (
                    <tr>
                      <td colSpan={columns.length} className="text-center">
                        No products found.
                      </td>
                    </tr>
                  )}
                  {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>

              <Stack direction="horizontal" className="justify-content-between align-items-center mt-3">
                <div>
                  <span className="text-muted">
                    Showing {table.getRowModel().rows.length} of {filteredProducts.length} entries
                  </span>
                </div>
                <Pagination>
                  <Pagination.Prev onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} />
                  {getPaginationItems()}
                  <Pagination.Next onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} />
                </Pagination>
              </Stack>
            </>
          )}
        </Card.Body>
      </Card>

      <AddProductModal
        show={showAddModal}
        onHide={closeAddModal}
        mainGroups={mainGroups}
        units={units}
        user={user}
        onSuccess={() => { closeAddModal(); fetchAllData(); }}
      />

      <EditProductModal
        show={showEditModal}
        onHide={closeEditModal}
        mainGroups={mainGroups}
        units={units}
        product={editingProduct}
        user={user}
        onSuccess={() => { closeEditModal(); fetchAllData(); }}
      />
    </>
  );
};

interface AddProductModalProps {
  show: boolean;
  onHide: () => void;
  mainGroups: MainGroup[];
  units: Unit[];
  user: any;
  onSuccess: () => void;
}


const AddProductModal: React.FC<AddProductModalProps> = ({ show, onHide, mainGroups, units, user, onSuccess }) => {
  const getInitialFormData = useCallback(() => ({
    product_nameeg: '',
    product_namemg: '',
    item_maingroupid: 0,
    unitid: 0,
    hsn_code: '',
    gstrate: 0,
    description: '',
    status: 1,
    hotelid: 1,
    companyid: user?.companyid || 0,
    yearid: user?.yearid || 0,
  }), [user]);
  const [formData, setFormData] = useState<Omit<Product, 'product_id'>>(getInitialFormData());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      companyid: user?.companyid || 0,
      yearid: user?.yearid || 0,
    })); // Keep this to update if user context changes while modal is open
  }, [user?.companyid, user?.yearid]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (e.currentTarget instanceof HTMLTextAreaElement) {
        if (e.shiftKey) {
          return; // Allow Shift+Enter for new line in textarea
        }
        e.preventDefault();
      } else {
        e.preventDefault();
      }
      const form = e.currentTarget.closest('form');
      if (form) {
        const elements = Array.from(form.elements) as HTMLElement[];
        const currentIndex = elements.indexOf(e.currentTarget as HTMLElement);
        let targetIndex = currentIndex + 1;
        let focused = false;
        while (targetIndex < elements.length) {
          const element = elements[targetIndex];
          if (element.tagName === 'INPUT' || element.tagName === 'SELECT' || element.tagName === 'TEXTAREA') {
            if ((element as HTMLInputElement).disabled || (element as HTMLSelectElement).disabled) {
              targetIndex++;
              continue;
            }
            // Found a valid focusable element
            (element as HTMLElement).focus();
            focused = true;
            break;
          } else {
            targetIndex++;
          }
        }
        if (!focused && targetIndex >= elements.length) {
          document.getElementById('submit-btn')?.click();
        }
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['gstrate', 'status', 'item_maingroupid', 'unitid', 'hotelid'].includes(name) ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalFormData = { ...formData, companyid: user?.companyid || 0, yearid: user?.yearid || 0, created_by_id: user?.userid || 0 };
    setLoading(true);
    try {
      await axios.post('/api/products', finalFormData, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
        },
      });
      toast.success('Product added successfully');
      onSuccess();
    } catch (error) {
      toast.error('Failed to add product');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onHide();
      setFormData(getInitialFormData());
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={!loading} size="lg" dialogClassName="modal-two-column">
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton={!loading}>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Group controlId="product_nameeg" className="mb-3">
                <Form.Label>Product Name (English)</Form.Label>
                <Form.Control
                  type="text"
                  name="product_nameeg"
                  value={formData.product_nameeg}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  required
                  disabled={loading}
                />
              </Form.Group>
              <Form.Group controlId="item_maingroupid" className="mb-3">
                <Form.Label>Main Group</Form.Label>
                <Form.Select
                  name="item_maingroupid"
                  value={formData.item_maingroupid}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  required
                  disabled={loading}
                >
                  <option value={0}>-- Select Main Group --</option>
                  {mainGroups.map(mg => (
                    <option key={mg.item_maingroupid} value={mg.item_maingroupid}>
                      {mg.item_group_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="hsn_code" className="mb-3">
                <Form.Label>HSN Code</Form.Label>
                <Form.Control
                  type="text"
                  name="hsn_code"
                  value={formData.hsn_code || 0}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                />
              </Form.Group>
              <Form.Group controlId="description" className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                  rows={3}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="product_namemg" className="mb-3">
                <Form.Label>Product Name (Local)</Form.Label>
                <Form.Control
                  type="text"
                  name="product_namemg"
                  value={formData.product_namemg}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                />
              </Form.Group>
              <Form.Group controlId="unitid" className="mb-3">
                <Form.Label>Unit</Form.Label>
                <Form.Select
                  name="unitid"
                  value={formData.unitid}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  required
                  disabled={loading}
                >
                  <option value={0}>-- Select Unit --</option>
                  {units.map(u => (
                    <option key={u.unitid} value={u.unitid}>
                      {u.unit_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
             <Form.Group controlId="gstrate" className="mb-3">
  <Form.Label>GST Rate</Form.Label>
  <Form.Select
    name="gstrate"
    value={formData.gstrate || 0}
    onChange={handleChange}
    onKeyDown={handleKeyDown}
    disabled={loading}
  >
    <option value={0}>0%</option>
    <option value={5}>5%</option>
    <option value={12}>12%</option>
    <option value={18}>18%</option>
    <option value={28}>28%</option>
  </Form.Select>
</Form.Group>

              <Form.Group controlId="status" className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                >
                  <option value={1}>Active</option>
                  <option value={0}>Inactive</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button id="submit-btn" variant="primary" type="submit" disabled={loading || !user}>
            {loading ? <Spinner animation="border" size="sm" /> : 'Add Product'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
interface EditProductModalProps {
  show: boolean;
  onHide: () => void;
  mainGroups: MainGroup[];
  units: Unit[];
  product: Product | null;
  user: any;
  onSuccess: () => void;
}


const EditProductModal: React.FC<EditProductModalProps> = ({ show, onHide, mainGroups, units, product, user, onSuccess }) => {
  const [formData, setFormData] = useState<Partial<Product>>({
    product_nameeg: '',
    product_namemg: '',
    item_maingroupid: 0,
    unitid: 0,
    hsn_code: '',
    gstrate: 0,
    description: '',
    status: 1,
    hotelid: 1,
  });
  const [loading, setLoading] = useState(false);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (e.currentTarget instanceof HTMLTextAreaElement) {
        if (e.shiftKey) {
          return; // Allow Shift+Enter for new line in textarea
        }
        e.preventDefault();
      } else {
        e.preventDefault();
      }
      const form = e.currentTarget.closest('form');
      if (form) {
        const elements = Array.from(form.elements) as HTMLElement[];
        const currentIndex = elements.indexOf(e.currentTarget as HTMLElement);
        let targetIndex = currentIndex + 1;
        let focused = false;
        while (targetIndex < elements.length) {
          const element = elements[targetIndex];
          if (element.tagName === 'INPUT' || element.tagName === 'SELECT' || element.tagName === 'TEXTAREA') {
            if ((element as HTMLInputElement).disabled || (element as HTMLSelectElement).disabled) {
              targetIndex++;
              continue;
            }
            // Found a valid focusable element
            (element as HTMLElement).focus();
            focused = true;
            break;
          } else {
            targetIndex++;
          }
        }
        if (!focused && targetIndex >= elements.length) {
          document.getElementById('submit-btn')?.click();
        }
      }
    }
  }, []);

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      // Reset form data if product becomes null (e.g., modal is hidden)
      setFormData({});
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['gstrate', 'status', 'item_maingroupid', 'unitid', 'hotelid'].includes(name) ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    const finalFormData = { ...formData, companyid: user?.companyid || 0, yearid: user?.yearid || 0, updated_by_id: user?.userid || 0 };
    setLoading(true);
    try {
      await axios.put(`/api/products/${product.product_id}`, finalFormData, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
        },
      });
      toast.success('Product updated successfully');
      onSuccess();
    } catch (error) {
      toast.error('Failed to update product');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={!loading} size="lg" dialogClassName="modal-two-column">
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton={!loading}>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Group controlId="product_nameeg" className="mb-3">
                <Form.Label>Product Name (English)</Form.Label>
                <Form.Control
                  type="text"
                  name="product_nameeg"
                  value={formData.product_nameeg || ''}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  required
                  disabled={loading}
                />
              </Form.Group>
              <Form.Group controlId="item_maingroupid" className="mb-3">
                <Form.Label>Main Group</Form.Label>
                <Form.Select
                  name="item_maingroupid"
                  value={formData.item_maingroupid || 0}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  required
                  disabled={loading}
                >
                  <option value={0}>-- Select Main Group --</option>
                  {mainGroups.map(mg => (
                    <option key={mg.item_maingroupid} value={mg.item_maingroupid}>
                      {mg.item_group_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="hsn_code" className="mb-3">
                <Form.Label>HSN Code</Form.Label>
                <Form.Control
                  type="text"
                  name="hsn_code"
                  value={formData.hsn_code || ''}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                />
              </Form.Group>
              <Form.Group controlId="description" className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={formData.description || ''}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                  rows={3}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="product_namemg" className="mb-3">
                <Form.Label>Product Name (Local)</Form.Label>
                <Form.Control
                  type="text"
                  name="product_namemg"
                  value={formData.product_namemg || ''}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                />
              </Form.Group>
              <Form.Group controlId="unitid" className="mb-3">
                <Form.Label>Unit</Form.Label>
                <Form.Select
                  name="unitid"
                  value={formData.unitid || 0}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  required
                  disabled={loading}
                >
                  <option value={0}>-- Select Unit --</option>
                  {units.map(u => (
                    <option key={u.unitid} value={u.unitid}>
                      {u.unit_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="gstrate" className="mb-3">
  <Form.Label>GST Rate</Form.Label>
  <Form.Select
    name="gstrate"
    value={formData.gstrate ?? 0}
    onChange={handleChange}
    onKeyDown={handleKeyDown}
    disabled={loading}
  >
    <option value={0}>0%</option>
    <option value={5}>5%</option>
    <option value={12}>12%</option>
    <option value={18}>18%</option>
    <option value={28}>28%</option>
  </Form.Select>
</Form.Group>

              <Form.Group controlId="status" className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  value={formData.status ?? 1}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                >
                  <option value={1}>Active</option>
                  <option value={0}>Inactive</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button id="submit-btn" variant="primary" type="submit" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : 'Save Changes'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default PanItemMasters;
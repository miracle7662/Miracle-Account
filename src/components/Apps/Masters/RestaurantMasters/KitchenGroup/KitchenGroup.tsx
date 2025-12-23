// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import Swal from 'sweetalert2';
// import { toast } from 'react-hot-toast';
// import { Preloader } from '@/components/Misc/Preloader';
// import { Button, Card, Stack, Table } from 'react-bootstrap';
// import TitleHelmet from '@/components/Common/TitleHelmet';
// import {
//   useReactTable,
//   getCoreRowModel,
//   getPaginationRowModel,
//   getFilteredRowModel,
//   ColumnDef,
//   flexRender,
// } from '@tanstack/react-table';

// interface KitchenMainGroupItem {
//   Kitchen_main_Group: string;
//   status: string;
//   created_by_id: string;
//   created_date: string;
//   updated_by_id: string;
//   updated_date: string;
//   hotelid: string;
//   marketid: string;
// }

// interface AddKitchenMainGroupModalProps {
//   show: boolean;
//   onHide: () => void;
//   onSuccess: () => void;
// }

// // Debounce utility function
// const debounce = (func: (...args: any[]) => void, wait: number) => {
//   let timeout: NodeJS.Timeout;
//   return (...args: any[]) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func(...args), wait);
//   };
// };

// // Main KitchenMainGroup Component
// const KitchenMainGroup: React.FC = () => {
//   const [KitchenMainGroupItem, setKitchenMainGroupItem] = useState<KitchenMainGroupItem[]>([]);
//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const [filteredKitchenMainGroup, setFilteredKitchenMainGroup] = useState<KitchenMainGroupItem[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [selectedKitchenMainGroup, setSelectedKitchenMainGroup] = useState<KitchenMainGroupItem | null>(null);

//   const fetchKitchenMainGroup = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch('http://localhost:3001/api/KitchenMainGroup');
//       const data = await res.json();
//       console.log('Fetched KitchenMainGroup:', data); // Debug log to inspect backend data
//       setKitchenMainGroupItem(data);
//       setFilteredKitchenMainGroup(data);
//     } catch (err) {
//       toast.error('Failed to fetch KitchenMainGroup');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchKitchenMainGroup();
//   }, []);

//   const columns = useMemo<ColumnDef<KitchenMainGroupItem>[]>(
//     () => [
//       {
//         id: 'srNo',
//         header: 'Sr No',
//         size: 50,
//         cell: ({ row }) => <div style={{ textAlign: 'center' }}>{row.index + 1}</div>,
//       },
//       {
//         accessorKey: 'Kitchen_main_Group',
//         header: 'KitchenMainGroup',
//         size: 200,
//         cell: (info) => <div style={{ textAlign: 'center' }}>{info.getValue<string>()}</div>,
//       },
//       {
//         accessorKey: 'status',
//         header: 'Status',
//         size: 150,
//         cell: (info) => {
//           const statusValue = info.getValue<string | number>();
//           console.log('Status value:', statusValue, typeof statusValue); // Debug log
//           return <div style={{ textAlign: 'center' }}>{statusValue == '0' || statusValue === 0 ? 'Active' : 'Inactive'}</div>;
//         },
//       },
//       {
//         id: 'actions',
//         header: () => <div style={{ textAlign: 'center' }}>Action</div>,
//         size: 150,
//         cell: ({ row }) => (
//           <div className="d-flex gap-2 justify-content-center">
//             <button
//               className="btn btn-sm btn-success"
//               onClick={() => handleEditClick(row.original)}
//               title="Edit KitchenMainGroup"
//             >
//               <i className="fi fi-rr-edit"></i>
//             </button>
//             <button
//               className="btn btn-sm btn-danger"
//               onClick={() => handleDeleteKitchenMainGroup(row.original)}
//               title="Delete Market"
//             >
//               <i className="fi fi-rr-trash"></i>
//             </button>
//           </div>
//         ),
//       },
//     ],
//     []
//   );

//   const table = useReactTable({
//     data: filteredKitchenMainGroup,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     initialState: {
//       pagination: {
//         pageSize: 10,
//       },
//     },
//   });

//   const handleSearch = useCallback(
//     debounce((value: string) => {
//       setSearchTerm(value);
//       const filteredKitchenMainGroupsBySearch = KitchenMainGroupItem.filter((item) =>
//         item.Kitchen_main_Group.toLowerCase().includes(value.toLowerCase())
//       );
//       setFilteredKitchenMainGroup(filteredKitchenMainGroupBySearch);
//     }, 300),
//     [KitchenMainGroupItem]
//   );

//   const handleEditClick = (mKitchenMainGroup: KitchenMainGroupItem) => {
//     setSelectedKitchenMainGroup(KitchenMainGroup);
//     setShowEditModal(true);
//   };

//   const handleDeleteKitchenMainGroup = async (KitchenMainGroup: KitchenMainGroupItem) => {
//     const res = await Swal.fire({
//       title: 'Are you sure?',
//       text: 'You will not be able to recover this KitchenMainGroup!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3E97FF',
//       confirmButtonText: 'Yes, delete it!',
//     });
//     if (res.isConfirmed) {
//       try {
//         await fetch(`http://localhost:3001/api/KitchenMainGroup/${KitchenMainGroup.kitchenmaingroupid}`, { method: 'DELETE' });
//         toast.success('Deleted successfully');
//         fetchKitchenMainGroup();
//         setSelectedKitchenMainGroup(null);
//       } catch {
//         toast.error('Failed to delete');
//       }
//     }
//   };

//   // AddKitchenMainGroupModal Component
//   const AddMarketModal: React.FC<AddKitchenMainGroupModalProps> = ({ show, onHide, onSuccess }) => {
//     const [Kitchen_main_Group, setKitchenMainGroup] = useState('');
//     const [status, setStatus] = useState('Active'); // Default to 'Active'
//     const [loading, setLoading] = useState(false);

//     const handleAdd = async () => {
//       if (!Kitchen_main_Group || !status) {
//         toast.error('KitchenMainGroup Name and Status are required');
//         return;
//       }

//       setLoading(true);
//       try {
//         const statusValue = status === 'Active' ? 0 : 1;
//         console.log('Sending to backend:', { Kitchen_main_Group, status: statusValue }); // Debug log
//         const res = await fetch('http://localhost:3001/api/KitchenMainGroup', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ Kitchen_main_Group, status: statusValue }),
//         });
//         if (res.ok) {
//           toast.success('Market added successfully');
//           setKitchenMainGroup('');
//           setStatus('Active'); // Reset to 'Active' after successful add
//           onSuccess();
//           onHide();
//         } else {
//           const errorData = await res.json();
//           console.log('Backend error:', errorData); // Debug log
//           toast.error('Failed to add KitchenMainGroup');
//         }
//       } catch (err) {
//         console.error('Add KitchenMainGroup error:', err); // Debug log
//         toast.error('Something went wrong');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (!show) return null;

//     return (
//       <div className="modal" style={{ display: show ? 'block' : 'none', background: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
//         <div className="modal-content" style={{ background: 'white', padding: '20px', maxWidth: '600px', margin: '100px auto', borderRadius: '8px' }}>
//           <div className="d-flex justify-content-between align-items-center mb-3">
//             <h5 className="mb-0">Add Market</h5>
//             <button className="btn-close" onClick={onHide}></button>
//           </div>
//           <div className="row mb-3">
//             <div className="col-md-12">
//               <label className="form-label">Market Name <span style={{ color: 'red' }}>*</span></label>
//               <input type="text" className="form-control" value={Kitchen_main_Group} onChange={(e) => setKitchenMainGroup(e.target.value)} placeholder="Enter Market Name" />
//             </div>
//           </div>
//           <div className="row mb-3">
//             <div className="col-md-12">
//               <label className="form-label">Status <span style={{ color: 'red' }}>*</span></label>
//               <select 
//                 className="form-control" 
//                 value={status} 
//                 onChange={(e) => setStatus(e.target.value)}
//               >
//                 <option value="Active">Active</option>
//                 <option value="Inactive">Inactive</option>
//               </select>
//             </div>
//           </div>
//           <div className="d-flex justify-content-end mt-4">
//             <button className="btn btn-success me-2" onClick={handleAdd} disabled={loading}>
//               {loading ? 'Adding...' : 'Create'}
//             </button>
//             <button className="btn btn-danger" onClick={onHide} disabled={loading}>
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // EditKitchenMainGroupModal Component
//   const EditKitchenMainGrouptModal: React.FC<{
//     show: boolean;
//     onHide: () => void;
//     KitchenMainGroup: KitchenMainGroupItem | null;
//     onSuccess: () => void;
//     onUpdateSelectedKitchenMainGroup: (KitchenMainGroup: KitchenMainGroupItem) => void;
//   }> = ({ show, onHide, KitchenMainGroup, onSuccess, onUpdateSelectedKitchenMainGroup }) => {
//     const [Kitchen_main_Group, setKitchenMainGroup] = useState('');
//     const [status, setStatus] = useState('');
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//       if (KitchenMainGroup) {
//         setKitchenMainGroup(KitchenMainGroup.Kitchen_main_Group);
//         setStatus(String(KitchenMainGroup.status) === '0' ? 'Active' : 'Inactive');
//         console.log('Edit KitchenMainGroup status:', KitchenMainGroup.status, typeof KitchenMainGroup.status); // Debug log
//       }
//     }, [KitchenMainGroup]);

//     const handleEdit = async () => {
//       if (!Kitchen_main_Group || !status) {
//         toast.error('KitchenMainGroup Name and Status are required');
//         return;
//       }

//       setLoading(true);
//       try {
//         const statusValue = status === 'Active' ? 0 : 1;
//         console.log('Sending to backend:', { Kitchen_main_Group, status: statusValue }); // Debug log
//         const res = await fetch(`http://localhost:3001/api/KitchenMainGroup/${KitchenMainGroup.kitchenmaingroupid}`, {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ Kitchen_main_Group, status: statusValue }),
//         });
//         if (res.ok) {
//           toast.success('KitchenMainGroup updated successfully');
//           onSuccess();
//           const updatedKitchenMainGroup = { ...KitchenMainGroup, Kitchen_main_Group, status: statusValue.toString() };
//           onUpdateSelectedKitchenMainGroup(updatedKitchenMainGroup);
//           onHide();
//         } else {
//           const errorData = await res.json();
//           console.log('Backend error:', errorData); // Debug log
//           toast.error('Failed to update KitchenMainGroup');
//         }
//       } catch (err) {
//         console.error('Edit KitchenMainGroup error:', err); // Debug log
//         toast.error('Something went wrong');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (!show || !KitchenMainGroup) return null;

//     return (
//       <div className="modal" style={{ display: show ? 'block' : 'none', background: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
//         <div className="modal-content" style={{ background: 'white', padding: '20px', maxWidth: '600px', margin: '100px auto', borderRadius: '8px' }}>
//           <div className="d-flex justify-content-between align-items-center mb-3">
//             <h5 className="mb-0">Edit KitchenMainGroup</h5>
//             <button className="btn-close" onClick={onHide}></button>
//           </div>
//           <div className="row mb-3">
//             <div className="col-md-12">
//               <label className="form-label">KitchenMainGroup Name <span style={{ color: 'red' }}>*</span></label>
//               <input type="text" className="form-control" value={Kitchen_main_Group} onChange={(e) => setKitchenMainGroup(e.target.value)} placeholder="Enter Market Name" />
//             </div>
//           </div>
//           <div className="row mb-3">
//             <div className="col-md-12">
//               <label className="form-label">Status <span style={{ color: 'red' }}>*</span></label>
//               <select 
//                 className="form-control" 
//                 value={status} 
//                 onChange={(e) => setStatus(e.target.value)}
//               >
//                 <option value="Active">Active</option>
//                 <option value="Inactive">Inactive</option>
//               </select>
//             </div>
//           </div>
//           <div className="d-flex justify-content-end mt-4">
//             <button className="btn btn-success me-2" onClick={handleEdit} disabled={loading}>
//               {loading ? 'Updating...' : 'Save'}
//             </button>
//             <button className="btn btn-danger" onClick={onHide} disabled={loading}>
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <>
//       <TitleHelmet title="KitchenMainGroup List" />
//       <Card className="m-1">
//         <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
//           <h4 className="mb-0">KitchenMainGroup List</h4>
//           <Button variant="success" onClick={() => setShowAddModal(true)}>
//             <i className="bi bi-plus"></i> Add KitchenMainGroup
//           </Button>
//         </div>
//         <div className="p-3">
//           {loading ? (
//             <Stack className="align-items-center justify-content-center flex-grow-1 h-100">
//               <Preloader />
//             </Stack>
//           ) : (
//             <Table responsive>
//               <thead>
//                 {table.getHeaderGroups().map((headerGroup) => (
//                   <tr key={headerGroup.id}>
//                     {headerGroup.headers.map((header) => (
//                       <th key={header.id} style={{ width: header.column.columnDef.size, textAlign: header.id === 'actions' ? 'left' : 'center' }}>
//                         {flexRender(header.column.columnDef.header, header.getContext())}
//                       </th>
//                     ))}
//                   </tr>
//                 ))}
//               </thead>
//               <tbody>
//                 {table.getRowModel().rows.map((row) => (
//                   <tr key={row.id}>
//                     {row.getVisibleCells().map((cell) => (
//                       <td key={cell.id} style={{ textAlign: cell.column.id === 'actions' ? 'left' : 'center' }}>
//                         {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           )}
//         </div>
//       </Card>
//       <AddKitchenMainGroupModal show={showAddModal} onHide={() => setShowAddModal(false)} onSuccess={fetchKitchenMainGroup} />
//       <EditKitchenMainGroupModal
//         show={showEditModal}
//         onHide={() => setShowEditModal(false)}
//         market={selectedKitchenMainGroup}
//         onSuccess={fetchMarkets}
//         onUpdateSelectedMarket={setSelectedMarket}
//       />
//     </>
//   );
// };

// export default Market;
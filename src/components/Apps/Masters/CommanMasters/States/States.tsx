// import React, { useState, useEffect, useMemo, useCallback } from 'react'
// import Swal from 'sweetalert2'
// import { toast } from 'react-hot-toast'
// import { Preloader } from '@/components/Misc/Preloader'
// import { Button, Card, Stack, Pagination, Table, Modal, Form } from 'react-bootstrap'
// import {
//   ContactSearchBar,
//   ContactSidebar,
// } from '@/components/Apps/Contact'
// import TitleHelmet from '@/components/Common/TitleHelmet'
// import {
//   useReactTable,
//   getCoreRowModel,
//   getPaginationRowModel,
//   getFilteredRowModel,
//   ColumnDef,
//   flexRender,
// } from '@tanstack/react-table'
// import {
//   fetchCountries,
//   CountryItem,

// } from '../../../../utils/commonfunction';

// // Define state data type
// interface StateItem {
//   id: string
//   code: string
//   name: string
//   country: string
//   capital: string
// }

// interface Category {
//   name: string
//   value: string
//   icon: string
//   badge?: number
//   badgeClassName?: string
// }

// interface Label {
//   name: string
//   value: string
//   gradient: string
// }

// //1
// // Debounce utility function
// const debounce = (func: (...args: any[]) => void, wait: number) => {
//   let timeout: NodeJS.Timeout
//   return (...args: any[]) => {
//     clearTimeout(timeout)
//     timeout = setTimeout(() => func(...args), wait)
//   }
// }

// const States: React.FC = () => {
//   const [stateItems, setStateItems] = useState<StateItem[]>([])
//   const [selectedCategory, setSelectedCategory] = useState<string>('alls')
//   const [searchTerm, setSearchTerm] = useState<string>('')
//   const [filteredStates, setFilteredStates] = useState<StateItem[]>([])
//   const [selectedState, setSelectedState] = useState<StateItem | null>(null)
//   const [selectedStateIndex, setSelectedStateIndex] = useState<number>(-1)
//   const [loading] = useState<boolean>(false)
//   const [showAddStateModal, setShowAddStateModal] = useState(false)
//   const [showEditStateModal, setShowEditStateModal] = useState(false)
//   const [sidebarLeftToggle, setSidebarLeftToggle] = useState<boolean>(false)
//   const [sidebarMiniToggle, setSidebarMiniToggle] = useState<boolean>(false)
//   const [containerToggle, setContainerToggle] = useState<boolean>(false)

//   const fetchStates = async () => {
//     try {
//       const res = await fetch('http://localhost:3001/api/states');
//       const data = await res.json();
//       setStateItems(data);
//       setFilteredStates(data);
//     } catch (err) {
//       toast.error('Failed to fetch states');
//     }
//   };

//   useEffect(() => {
//     fetchStates();
//   }, []);

//   // Define columns for react-table with explicit widths
//   const columns = React.useMemo<ColumnDef<StateItem>[]>(
//     () => [
//       {
//         id: 'srNo',
//         header: 'Sr No',
//         size: 20,
//         cell: ({ row }) => <span>{row.index + 1}</span>,
//       },
//       {
//         accessorKey: 'code',
//         header: 'Code',
//         size: 10,
//         cell: (info) => (
//           <div className="avatar avatar-md rounded-circle bg-light text-muted">
//             {info.getValue<string>()}
//           </div>
//         ),
//       },
//       {
//         accessorKey: 'name',
//         header: 'State',
//         size: 10,
//         cell: (info) => <h6 className="mb-1">{info.getValue<string>()}</h6>,
//       },
//       {
//         id: 'actions',
//         header: 'Actions',
//         size: 30,
//         cell: ({ row }) => (
//           <div className="d-flex gap-2">
//             <button
//               className="btn btn-sm btn-success"
//               onClick={() => handleEditStateClick(row.original)}
//               style={{ padding: '4px 8px' }}
//             >
//               <i className="fi fi-rr-edit"></i>
//             </button>
//             <button
//               className="btn btn-sm btn-danger"
//               onClick={() => handleDeleteState(row.original)}
//               style={{ padding: '4px 8px' }}
//             >
//               <i className="fi fi-rr-trash"></i>
//             </button>
//           </div>
//         ),
//       },
//     ],
//     [],
//   )

//   // Initialize react-table with pagination
//   const table = useReactTable({
//     data: filteredStates,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     initialState: {
//       pagination: {
//         pageSize: 10,
//       },
//     },
//   })



//   useEffect(() => {
//     setFilteredStates(stateItems.filter((item) => item))
//   }, [stateItems])

//   const handleSearch = useCallback(
//     debounce((value: string) => {
//       setSearchTerm(value)

//       const filteredStatesByCategory = stateItems.filter(
//         (item) => item,
//       )
//       const filteredStatesBySearch = filteredStatesByCategory.filter((item) =>
//         item.name.toLowerCase().includes(value.toLowerCase()),
//       )
//       setFilteredStates(filteredStatesBySearch)
//     }, 300),
//     [stateItems, selectedCategory]
//   )

//   const handleCategoryChange = useCallback((categoryValue: string) => {
//     setSelectedCategory(categoryValue)
//     setSearchTerm('')
//     setFilteredStates(stateItems.filter((item) => item))
//   }, [stateItems])

//   const handleStateItemClick = useCallback((state: StateItem) => {
//     setSelectedState(state)
//     setContainerToggle(true)
//   }, [])

//   const handleEditStateClick = useCallback((state: StateItem) => {
//     setSelectedState(state)
//     setShowEditStateModal(true)
//   }, [])

//   const handleDeleteState = useCallback(async (state: StateItem) => {
//     const res = await Swal.fire({
//       title: 'Are you sure?',
//       text: 'You will not be able to recover this state!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3E97FF',
//       confirmButtonText: 'Yes, delete it!',
//     });

//     if (res.isConfirmed) {
//       try {
//         await fetch(`http://localhost:3001/api/states/${state.id}`, { method: 'DELETE' });
//         setSelectedState(null);
//         setContainerToggle(false);
//         // Immediately update local state to remove the deleted state
//         setStateItems((prev) => prev.filter((s) => s.id !== state.id));
//         setFilteredStates((prev) => prev.filter((s) => s.id !== state.id));
//         // Clear the right panel if the deleted state was selected
//         if (selectedState && selectedState.id === state.id) {

//           setSelectedStateIndex(-1); // Reset the index to prevent navigation issues
//         }
//         toast.success('State deleted successfully');
//         // Refresh from backend to ensure consistency
//         await fetchStates();
//       } catch (error) {
//         toast.error('Failed to delete state');
//         console.error('Deletion error:', error);
//       }
//     }
//   }, [selectedState, fetchStates])

//   useEffect(() => {
//     const index = filteredStates.findIndex(
//       (state) => state.id === (selectedState?.id || ''),
//     )
//     setSelectedStateIndex(index)
//   }, [filteredStates, selectedState])

//   const handleNext = useCallback(() => {
//     if (selectedStateIndex < filteredStates.length - 1) {
//       const nextIndex = selectedStateIndex + 1
//       setSelectedState(filteredStates[nextIndex])
//       setContainerToggle(true)
//     }
//   }, [selectedStateIndex, filteredStates])

//   const handlePrev = useCallback(() => {
//     if (selectedStateIndex > 0) {
//       const prevIndex = selectedStateIndex - 1
//       setSelectedState(filteredStates[prevIndex])
//       setContainerToggle(true)
//     }
//   }, [selectedStateIndex, filteredStates])

//   // Compute the card classes based on state
//   const cardClasses = useMemo(() => {
//     let classes = 'apps-card'
//     if (sidebarMiniToggle) classes += ' apps-sidebar-mini-toggle'
//     if (containerToggle) classes += ' apps-container-toggle'
//     if (sidebarLeftToggle) classes += ' apps-sidebar-left-toggle'
//     return classes
//   }, [sidebarMiniToggle, containerToggle, sidebarLeftToggle])

//   // Handle resize for sidebarLeftToggle
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth <= 991.98 && sidebarLeftToggle) {
//         setSidebarLeftToggle(false)
//       }
//     }

//     window.addEventListener('resize', handleResize)
//     handleResize()

//     return () => {
//       window.removeEventListener('resize', handleResize)
//     }
//   }, [sidebarLeftToggle])

//   const handleMenuClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
//     e.stopPropagation()
//     setSidebarLeftToggle((prev) => !prev)
//   }, [])

//   return (
//     <>
//       <TitleHelmet title="States" />
//       <style>
//         {`
//           .apps-card {
//             transition: all 0.3s ease-in-out;
//           }
//           .apps-sidebar-left,
//           .apps-container {
//             transition: width 0.3s ease-in-out;
//           }
//         `}
//       </style>
//       <Card className={cardClasses}>


//         <div className="apps-sidebar apps-sidebar-left apps-sidebar-md" style={{ minWidth: '450px' }}>
//           <ContactSearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
//           <div
//             className="apps-sidebar-content"
//             style={{
//               display: 'flex',
//               flexDirection: 'column',
//               height: '100%',
//               minWidth: '250px'
//             }}
//           >
//             <div className="d-flex justify-content-between align-items-center mb-0 px-1 ">
//               <span className="text-muted fw-bold"></span>
//               <span className="text-muted fw-bold"></span>
//             </div>
//             <div style={{ marginLeft: '10px' }}>
//               <Table
//                 responsive
//                 size='sm'
//                 className="mb-0"
//                 style={{ minWidth: '300px' }}
//               >
//                 <thead>
//                   {table.getHeaderGroups().map((headerGroup) => (
//                     <tr key={headerGroup.id}>
//                       {headerGroup.headers.map((header) => (
//                         <th
//                           key={header.id}
//                           colSpan={header.colSpan}
//                           style={{ width: header.column.columnDef.size }}
//                         >
//                           {header.isPlaceholder ? null : (
//                             <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
//                           )}
//                         </th>
//                       ))}
//                     </tr>
//                   ))}
//                 </thead>
//                 <tbody>
//                   {table.getRowModel().rows.map((row) => (
//                     <tr
//                       key={row.id}
//                       className={selectedState?.id === row.original.id ? 'active' : ''}
//                       onClick={() => handleStateItemClick(row.original)}
//                     >
//                       {row.getVisibleCells().map((cell) => (
//                         <td key={cell.id}>
//                           {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                         </td>
//                       ))}
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//             </div>
//             <Stack
//               className="p-2 border-top d-flex flex-row align-items-center justify-content-between"
//               style={{ gap: '6px', padding: '8px 12px' }}
//             >
//               <select
//                 value={table.getState().pagination.pageSize}
//                 onChange={(e) => {
//                   table.setPageSize(Number(e.target.value))
//                 }}
//                 style={{
//                   border: '1px solid #0d6efd',
//                   borderRadius: '4px',
//                   padding: '2px 4px',
//                   fontSize: '12px',
//                   backgroundColor: '#fff',
//                   color: '#6c757d',
//                   cursor: 'pointer',
//                   width: '100px',
//                   height: '30px',
//                 }}
//               >
//                 {[10, 20, 30].map((pageSize) => (
//                   <option key={pageSize} value={pageSize}>
//                     {pageSize}
//                   </option>
//                 ))}
//               </select>
//               <Pagination
//                 className="m-0"
//                 style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '3px',
//                   marginRight: '20px',
//                 }}
//               >
//                 <Pagination.Prev
//                   onClick={() => table.setPageIndex(table.getState().pagination.pageIndex - 1)}
//                   disabled={table.getState().pagination.pageIndex === 0}
//                   style={{
//                     border: '1px solid #e5e7eb',
//                     color: table.getState().pagination.pageIndex === 0 ? '#d3d3d3' : '#6c757d',
//                     padding: '2px 4px',
//                     borderRadius: '4px',
//                     backgroundColor: 'transparent',
//                     fontSize: '12px',
//                     lineHeight: '1',
//                   }}
//                 >
//                   <i className="fi fi-rr-angle-left" style={{ fontSize: '12px' }} />
//                 </Pagination.Prev>
//                 <Pagination.Item
//                   active
//                   style={{
//                     backgroundColor: '#0d6efd',
//                     border: '1px solid #0d6efd',
//                     color: '#fff',
//                     padding: '2px 6px',
//                     borderRadius: '4px',
//                     fontSize: '12px',
//                     minWidth: '24px',
//                     textAlign: 'center',
//                     lineHeight: '1',
//                   }}
//                 >
//                   {table.getState().pagination.pageIndex + 1}
//                 </Pagination.Item>
//                 <Pagination.Next
//                   onClick={() => table.setPageIndex(table.getState().pagination.pageIndex + 1)}
//                   disabled={table.getState().pagination.pageIndex === table.getPageCount() - 1}
//                   style={{
//                     border: '1px solid #e5e7eb',
//                     color: table.getState().pagination.pageIndex === table.getPageCount() - 1 ? '#d3d3d3' : '#6c757d',
//                     padding: '2px 4px',
//                     borderRadius: '4px',
//                     backgroundColor: 'transparent',
//                     fontSize: '12px',
//                     lineHeight: '1',
//                   }}
//                 >
//                   <i className="fi fi-rr-angle-right" style={{ fontSize: '12px' }} />
//                 </Pagination.Next>
//               </Pagination>
//             </Stack>
//           </div>
//         </div>
//         <div className={`apps-container ${containerToggle ? 'w-full' : ''}`}>
//           <div className="apps-container-inner" style={{ minHeight: 'calc(100vh )' }}>
//             {loading ? (
//               <Stack className="align-items-center justify-content-center  h-100">
//                 <Preloader />
//               </Stack>
//             ) : !selectedState ? (
//               <Stack
//                 className="d-none d-lg-flex align-items-center justify-content-center flex-grow-1 h-100 mx-auto text-center"
//                 style={{ maxWidth: '420px' }}
//               >
//                 <i className="fi fi-rr-globe fs-48 mb-6"></i>
//                 <h4 className="fw-bold">Select a state to view</h4>
//                 <p className="fs-15 fw-light text-muted mb-4">
//                   Select a state from the left sidebar to view its details.
//                 </p>
//                 <Button
//                   variant=""
//                   className="btn-neutral"
//                   onClick={() => setShowAddStateModal(true)}
//                 >
//                   <i className="fi fi-br-plus fs-10"></i>
//                   <span className="ms-2">Add New State</span>
//                 </Button>
//               </Stack>
//             ) : (
//               <div>
//                 <div className="apps-contact-details-header p-3 border-bottom">
//                   <div className="d-flex align-items-center justify-content-between">
//                     <div className="d-flex align-items-center">
//                       <button
//                         className="btn btn-sm btn-icon btn-light me-3"
//                         onClick={() => {
//                           setSelectedState(null)
//                           setContainerToggle(false)
//                           setSidebarLeftToggle(false)
//                         }}
//                       >
//                         <i className="fi fi-rr-arrow-left"></i>
//                       </button>
//                       <div className="flex-grow-1">
//                         <h5 className="mb-1">States</h5>
//                       </div>
//                     </div>
//                     <div className="d-flex gap-2">
//                       <button
//                         className="btn btn-icon btn-light"
//                         onClick={handleMenuClick}
//                         style={{ padding: '8px', fontSize: '1.2rem' }}
//                       >
//                         <i className="fi fi-rr-menu-burger"></i>
//                       </button>
//                       <button
//                         className="btn btn-icon btn-light"
//                         onClick={handlePrev}
//                         disabled={selectedStateIndex <= 0}
//                         style={{ padding: '8px', fontSize: '1.2rem' }}
//                       >
//                         <i className="fi fi-rr-angle-left"></i>
//                       </button>
//                       <button
//                         className="btn btn-icon btn-light"
//                         onClick={handleNext}
//                         disabled={selectedStateIndex >= filteredStates.length - 1}
//                         style={{ padding: '8px', fontSize: '1.2rem' }}
//                       >
//                         <i className="fi fi-rr-angle-right"></i>
//                       </button>
//                       <button
//                         className="btn btn-icon btn-light"
//                         onClick={() => handleDeleteState(selectedState)}
//                         style={{ padding: '8px', fontSize: '1.2rem' }}
//                       >
//                         <i className="fi fi-rr-trash"></i>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="apps-contact-details p-4">
//                   <div className="mb-4">
//                     <h5 className="mb-2">{selectedState.name}</h5>
//                     <p className="text-muted mb-0">State Code: {selectedState.code}</p>
//                   </div>
//                   <div className="mb-4">
//                     <p className="text-muted mb-0">Country: {selectedState.country}</p>
//                   </div>
//                   <div className="mb-4">
//                     <p className="text-muted mb-0">Capital: {selectedState.capital}</p>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="custom-backdrop" onClick={() => setSidebarMiniToggle(false)}></div>
//       </Card>
//       <AddStateModal
//         show={showAddStateModal}
//         onHide={() => setShowAddStateModal(false)}
//         onSuccess={fetchStates}
//       />
//       <EditStateModal
//         show={showEditStateModal}
//         onHide={() => setShowEditStateModal(false)}
//         state={selectedState}
//         onSuccess={fetchStates}
//         onUpdateSelectedState={(updatedState) => setSelectedState(updatedState)}
//       />
//     </>
//   )
// }

// //2
// // AddStateModal component
// interface AddStateModalProps {
//   show: boolean;
//   onHide: () => void;
//   onSuccess: () => void;
// }

// const AddStateModal: React.FC<AddStateModalProps> = ({ show, onHide, onSuccess }) => {
//   const [name, setName] = useState('');
//   const [code, setCode] = useState('');
//   const [capital, setCapital] = useState('');
//   const [country, setCountry] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [countries, setCountries] = useState<Array<{ id: string, name: string }>>([]);
//   const [countryItems, setCountryItems] = useState<CountryItem[]>([]);
//   const [filteredCountries, setFilteredCountries] = useState<CountryItem[]>([]);
//   const [countryId, setCountryId] = useState<number | null>(null);



//   // Fetch countries when modal opens
//   useEffect(() => {
//     fetchCountries(setCountryItems, setFilteredCountries, setLoading);
//   }, []);


//   const handleAdd = async () => {
//     if (!name || !code || !capital ) {
//       toast.error('All fields are required');
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch('http://localhost:3001/api/states', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, code, capital, country }),
//       });
//       if (res.ok) {
//         toast.success('State added successfully');
//         setName('');
//         setCode('');
//         setCapital('');
//         setCountry('');
//         onSuccess();
//         onHide();
//       } else {
//         toast.error('Failed to add state');
//       }
//     } catch (err) {
//       toast.error('Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal show={show} onHide={onHide}>
//       <Modal.Header closeButton>
//         <Modal.Title>Add State</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form.Group className="mb-3">
//           <Form.Label>State Name</Form.Label>
//           <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label>State Code</Form.Label>
//           <Form.Control type="text" value={code} onChange={(e) => setCode(e.target.value)} />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label>Capital</Form.Label>
//           <Form.Control type="text" value={capital} onChange={(e) => setCapital(e.target.value)} />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label>Country</Form.Label>
//           <select
//             className="form-control"
//             value={countryId ?? ''}
//             onChange={(e) => {
//               const value = e.target.value;
//               setCountryId(value === '' ? null : Number(value));
//             }}
//             disabled={loading}
//           >
//             <option value="">Select a country</option>
//             {countryItems.map((country: CountryItem) => (
//               <option key={country.id} value={country.id}>
//                 {country.name}
//               </option>
//             ))}
//           </select>
//         </Form.Group>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={onHide} disabled={loading}>
//           Cancel
//         </Button>
//         <Button variant="primary" onClick={handleAdd} disabled={loading}>
//           {loading ? 'Adding...' : 'Add State'}
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };
// //3
// // EditStateModal component
// interface EditStateModalProps {
//   show: boolean;
//   onHide: () => void;
//   state: StateItem | null;
//   onSuccess: () => void;
//   onUpdateSelectedState: (state: StateItem) => void;
// }

// const EditStateModal: React.FC<EditStateModalProps> = ({ show, onHide, state, onSuccess, onUpdateSelectedState }) => {
//   const [name, setName] = useState('');
//   const [code, setCode] = useState('');
//   const [capital, setCapital] = useState('');
//   const [country, setCountry] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [countries, setCountries] = useState<Array<{ id: string, name: string }>>([]);
//   const [countryItems, setCountryItems] = useState<CountryItem[]>([]);
//   const [filteredCountries, setFilteredCountries] = useState<CountryItem[]>([]);
//   const [countryId, setCountryId] = useState<number | null>(null);


//   // Fetch countries when modal opens
//   useEffect(() => {
//     fetchCountries(setCountryItems, setFilteredCountries, setLoading);

//   }, []);

//   useEffect(() => {
//     if (state) {
//       setName(state.name);
//       setCode(state.code);
//       setCapital(state.capital);
//       setCountry(state.country);
//     }
//   }, [state]);

//   const handleEdit = async () => {
//     if (!name || !code || !capital||!state) {
//       toast.error('All fields are required');
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch(`http://localhost:3001/api/states/${state.id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, code, capital, country }),
//       });
//       if (res.ok) {
//         toast.success('State updated successfully');
//         onSuccess();
//         // Update the selected state in the parent component
//         if (state) {
//           const updatedState: StateItem = { id: state.id, name, code, capital, country };
//           onUpdateSelectedState(updatedState);
//         }
//         onHide();
//       } else {
//         toast.error('Failed to update state');
//       }
//     } catch (err) {
//       toast.error('Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal show={show} onHide={onHide}>
//       <Modal.Header closeButton>
//         <Modal.Title>Edit State</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form.Group className="mb-3">
//           <Form.Label>State Name</Form.Label>
//           <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label>State Code</Form.Label>
//           <Form.Control type="text" value={code} onChange={(e) => setCode(e.target.value)} />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label>Capital</Form.Label>
//           <Form.Control type="text" value={capital} onChange={(e) => setCapital(e.target.value)} />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label>Country</Form.Label>
//           <select
//             className="form-control"
//             value={countryId ?? ''}
//             onChange={(e) => {
//               const value = e.target.value;
//               setCountryId(value === '' ? null : Number(value));
//             }}
//             disabled={loading}
//           >
//             <option value="">Select a country</option>
//             {countryItems.map((country: CountryItem) => (
//               <option key={country.id} value={country.id}>
//                 {country.name}
//               </option>
//             ))}
//           </select>
//         </Form.Group>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={onHide} disabled={loading}>
//           Cancel
//         </Button>
//         <Button variant="primary" onClick={handleEdit} disabled={loading}>
//           {loading ? 'Updating...' : 'Update State'}
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };


// export default React.memo(States)
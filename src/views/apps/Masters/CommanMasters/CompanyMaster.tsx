import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Modal, Button, Form, Card, Stack } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface ICompany {
  companyid?: string;
  company_title?: string;
  company_name: string;
  company_address: string;
  mobile1: string;
  mobile2?: string;
  stateid?: string;
  state_name?: string;
  cityid?: string;
  city_name?: string;
  email?: string;
  website?: string;
  sales_tax_no?: string;
  shop_act_no?: string;
  pan_no?: string;
  it_ward?: string;
  shop_act_renewal_date?: string;
  gst_in_no?: string;
  is_aavak_req: boolean;
  item_readonly: boolean;
  katala_readonly: boolean;
  dalali: string;
  hamali: string;
  vatav: string;
  commission: string;
  status: number;
  companylogo?: string | File | null;
  Name1?: string;
  Name2?: string;
  created_date?: string;
  updated_date?: string;
}

interface State {
  stateid: string;
  state_name: string;
}

interface City {
  cityid: string;
  city_name: string;
}

const CompanyMaster = () => {
  const [data, setData] = useState<ICompany[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingRow, setEditingRow] = useState<string | null>(null);

  const [form, setForm] = useState<ICompany>({
    company_title: "",
    company_name: "",
    company_address: "",
    mobile1: "",
    mobile2: "",
    stateid: "",
    cityid: "",
    email: "",
    website: "",
    sales_tax_no: "",
    shop_act_no: "",
    pan_no: "",
    it_ward: "",
    shop_act_renewal_date: "",
    gst_in_no: "",
    is_aavak_req: false,
    item_readonly: false,
    katala_readonly: false,
    dalali: "0",
    hamali: "0",
    vatav: "0",
    commission: "0",
    status: 1,
    Name1: "",
    Name2: "",
  });

  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  // FETCH DATA
  const loadData = useCallback(async () => {
    try {
      const res = await axios.get<ICompany[]>("/api/companymaster");
      setData(res.data);
    } catch (err: any) {
      let errorMessage = "Unknown error";
      if (err && err.response && err.response.data && err.response.data.error) {
        errorMessage = err.response.data.error;
      } else if (err && err.message) {
        errorMessage = err.message;
      }
      console.error("Fetch Error:", errorMessage);
      toast.error("Error fetching data: " + errorMessage);
    }
  }, []);

  // Fetch states list from backend
  const loadStates = async () => {
    try {
      const res = await axios.get("/api/states");
      setStates(res.data);
    } catch (error) {
      toast.error("Failed to load states");
    }
  };

  // Fetch cities for selected state
  const loadCities = async (stateId: string) => {
    try {
      if (stateId) {
        const res = await axios.get(`/api/cities/${stateId}`);
        setCities(res.data);
      } else {
        setCities([]);
      }
    } catch (error) {
      toast.error("Failed to load cities");
    }
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Fetch states when modal is shown
  useEffect(() => {
    if (showModal) {
      loadStates();
    }
  }, [showModal]);

  // Fetch cities when state changes
  useEffect(() => {
    loadCities(form.stateid || "");
  }, [form.stateid]);

  // Enter key handler to focus next field, skipping disabled
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

  // INPUT CHANGE
  const updateForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else if (type === "file") {
      const files = (e.target as HTMLInputElement).files;
      setForm((prev) => ({
        ...prev,
        [name]: files ? files[0] : null,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // OPEN ADD MODAL
  const openAddModal = () => {
    setEditingRow(null);
    setForm({
      company_title: "",
      company_name: "",
      company_address: "",
      mobile1: "",
      mobile2: "",
      stateid: "",
      cityid: "",
      email: "",
      website: "",
      sales_tax_no: "",
      shop_act_no: "",
      pan_no: "",
      it_ward: "",
      shop_act_renewal_date: "",
      gst_in_no: "",
      is_aavak_req: false,
      item_readonly: false,
      katala_readonly: false,
      dalali: "0",
      hamali: "0",
      vatav: "0",
      commission: "0",
      status: 1,
      Name1: "",
      Name2: "",
    });
    setShowModal(true);
  };

  // OPEN EDIT MODAL
  const openEditModal = (row: ICompany) => {
    setEditingRow(row.companyid || "");
    setForm({
      companyid: row.companyid,
      company_title: row.company_title || "",
      company_name: row.company_name,
      company_address: row.company_address,
      mobile1: row.mobile1,
      mobile2: row.mobile2 || "",
      stateid: row.stateid || "",
      cityid: row.cityid || "",
      email: row.email || "",
      website: row.website || "",
      sales_tax_no: row.sales_tax_no || "",
      shop_act_no: row.shop_act_no || "",
      pan_no: row.pan_no || "",
      it_ward: row.it_ward || "",
      shop_act_renewal_date: row.shop_act_renewal_date || "",
      gst_in_no: row.gst_in_no || "",
      is_aavak_req: row.is_aavak_req || false,
      item_readonly: row.item_readonly || false,
      katala_readonly: row.katala_readonly || false,
      dalali: row.dalali || "0",
      hamali: row.hamali || "0",
      vatav: row.vatav || "0",
      commission: row.commission || "0",
      status: row.status,
      companylogo: null, // Reset file input for editing
      Name1: row.Name1 || "",
      Name2: row.Name2 || "",
      created_date: row.created_date,
      updated_date: row.updated_date,
    });
    setShowModal(true);
  };

  // SAVE RECORD (ADD/UPDATE)
  const saveRecord = async () => {
    try {
      // Validate required fields
      if (!form.company_name || form.company_name.trim() === "") {
        toast.error("Company Name is required.");
        return;
      }

      if (!form.company_address || form.company_address.trim() === "") {
        toast.error("Company Address is required.");
        return;
      }

      if (!form.mobile1 || form.mobile1.trim() === "") {
        toast.error("Mobile 1 is required.");
        return;
      }

      // Create FormData for file upload
      const formData = new FormData();
      formData.append('company_title', form.company_title || '');
      formData.append('company_name', form.company_name);
      formData.append('company_address', form.company_address);
      formData.append('mobile1', form.mobile1);
      formData.append('mobile2', form.mobile2 || '');
      formData.append('stateid', form.stateid || '');
      formData.append('cityid', form.cityid || '');
      formData.append('email', form.email || '');
      formData.append('website', form.website || '');
      formData.append('sales_tax_no', form.sales_tax_no || '');
      formData.append('shop_act_no', form.shop_act_no || '');
      formData.append('pan_no', form.pan_no || '');
      formData.append('it_ward', form.it_ward || '');
      formData.append('shop_act_renewal_date', form.shop_act_renewal_date || '');
      formData.append('gst_in_no', form.gst_in_no || '');
      formData.append('is_aavak_req', form.is_aavak_req ? '1' : '0');
      formData.append('item_readonly', form.item_readonly ? '1' : '0');
      formData.append('katala_readonly', form.katala_readonly ? '1' : '0');
      formData.append('dalali', form.dalali);
      formData.append('hamali', form.hamali);
      formData.append('vatav', form.vatav);
      formData.append('commission', form.commission);
      formData.append('status', form.status.toString());
      formData.append('Name1', form.Name1 || '');
      formData.append('Name2', form.Name2 || '');

      // Append file if exists
      if (form.companylogo && form.companylogo instanceof File) {
        formData.append('companylogo', form.companylogo);
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      if (editingRow) {
        // UPDATE
        await axios.put(`/api/companymaster/${editingRow}`, formData, config);
      } else {
        // INSERT
        await axios.post("/api/companymaster", formData, config);
      }

      setShowModal(false);
      loadData();
      toast.success(editingRow ? "Updated successfully!" : "Added successfully!");
    } catch (err: unknown) {
      console.error("Save Error:", err);
      toast.error("Error saving record: " + (err as any)?.response?.data?.error || (err as Error).message);
    }
  };

  // DELETE
  const deleteRow = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this company?")) return;
    try {
      await axios.delete(`/api/companymaster/${id}`);
      loadData();
      toast.success("Deleted successfully!");
    } catch (err: unknown) {
      console.error("Delete Error:", err);
      toast.error("Error deleting record");
    }
  };

  return (
    <>
      <Card className="m-1">
        <Card.Body>
          <Stack direction="horizontal" className="mb-3 justify-content-between align-items-center">
            <h4 className="mb-0">Company Master</h4>
            <Button variant="success" onClick={openAddModal}>
              Add New Company
            </Button>
          </Stack>

          {/* TABLE */}
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Company ID</th>
                  <th>Company Name</th>
                  <th>Address</th>
                  <th>Mobile 1</th>
                  <th>Email</th>
                  <th>GST No</th>
                  <th>PAN No</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {data.map((row) => (
                  <tr key={row.companyid}>
                    <td>{row.companyid}</td>
                    <td>{row.company_name}</td>
                    <td>
                      <div style={{ whiteSpace: "pre-wrap", maxWidth: "200px" }}>
                        {row.company_address}
                      </div>
                    </td>
                    <td>{row.mobile1}</td>
                    <td>{row.email}</td>
                    <td>{row.gst_in_no}</td>
                    <td>{row.pan_no}</td>
                    <td>{row.status === 1 ? "Active" : "Inactive"}</td>
                    <td>
                      <Button size="sm" variant="warning" onClick={() => openEditModal(row)}>
                        Edit
                      </Button>{" "}
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => deleteRow(row.companyid || "")}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>

      {/* MODAL FORM */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
        dialogClassName="small-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>{editingRow ? "Edit" : "Add"} Company</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            {/* FIRST ROW — COMPANY TITLE + COMPANY NAME */}
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <Form.Label className="me-3" style={{ width: "140px" }}>
                    Company Title
                  </Form.Label>
                  <Form.Control
                    name="company_title"
                    value={form.company_title || ""}
                    onChange={updateForm}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <Form.Label className="me-3" style={{ width: "140px" }}>
                    Company Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    name="company_name"
                    value={form.company_name}
                    onChange={updateForm}
                    onKeyDown={handleKeyDown}
                    required
                  />
                </div>
              </div>
            </div>

            {/* SECOND ROW — ADDRESS */}
            <div className="d-flex align-items-start mb-3">
              <Form.Label className="me-3 mt-1" style={{ width: "140px" }}>
                Address <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="company_address"
                value={form.company_address}
                onChange={updateForm}
                onKeyDown={handleKeyDown}
                required
              />
            </div>

            {/* THIRD ROW — STATE + CITY */}
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <Form.Label className="me-3" style={{ width: "140px" }}>
                    State
                  </Form.Label>
                  <Form.Select
                    name="stateid"
                    value={form.stateid || ""}
                    onChange={updateForm}
                    onKeyDown={handleKeyDown}
                  >
                    <option value="">Select State</option>
                    {states.map((s) => (
                      <option key={s.stateid} value={s.stateid}>
                        {s.state_name}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <Form.Label className="me-3" style={{ width: "140px" }}>
                    City
                  </Form.Label>
                  <Form.Select
                    name="cityid"
                    value={form.cityid || ""}
                    onChange={updateForm}
                    onKeyDown={handleKeyDown}
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city.cityid} value={city.cityid}>
                        {city.city_name}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </div>
            </div>

            {/* CONTACT DETAILS — FOURTH ROW */}
            <div className="row">
              <div className="col-md-6">
                <div className="d-flex align-items-center mb-3">
                  <Form.Label className="me-3" style={{ width: "140px" }}>
                    Mobile 1 <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    name="mobile1"
                    value={form.mobile1}
                    onChange={updateForm}
                    onKeyDown={handleKeyDown}
                    required
                  />
                </div>

                <div className="d-flex align-items-center mb-3">
                  <Form.Label className="me-3" style={{ width: "140px" }}>
                    Mobile 2
                  </Form.Label>
                  <Form.Control
                    name="mobile2"
                    value={form.mobile2 || ""}
                    onChange={updateForm}
                    onKeyDown={handleKeyDown}
                  />
                </div>

                <div className="d-flex align-items-center mb-3">
                  <Form.Label className="me-3" style={{ width: "140px" }}>
                    Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={form.email || ""}
                    onChange={updateForm}
                    onKeyDown={handleKeyDown}
                  />
                </div>

                <div className="d-flex align-items-center mb-3">
                  <Form.Label className="me-3" style={{ width: "140px" }}>
                    Website
                  </Form.Label>
                  <Form.Control
                    name="website"
                    value={form.website || ""}
                    onChange={updateForm}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="d-flex align-items-center mb-3">
                  <Form.Label className="me-3" style={{ width: "140px" }}>
                   Name 1
                  </Form.Label>
                  <Form.Control
                    name="Name1"
                    value={form.Name1 || ""}
                    onChange={updateForm}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                <div className="d-flex align-items-center mb-3">
                  <Form.Label className="me-3" style={{ width: "140px" }}>
                    Name 2
                  </Form.Label>
                  <Form.Control
                    name="Name2"
                    value={form.Name2 || ""}
                    onChange={updateForm}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>
            </div>

            {/* FIFTH ROW — COMPANY LOGO */}
            <div className="d-flex align-items-center mb-3">
              <Form.Label className="me-3" style={{ width: "140px" }}>
                Company Logo
              </Form.Label>
              <Form.Control
                type="file"
                name="companylogo"
                accept="image/*"
                onChange={updateForm}
              />
            </div>

            {/* TAX DETAILS */}
            <div className="row">
              <div className="col-md-6">
                <div className="d-flex align-items-center mb-3">
                  <Form.Label className="me-3" style={{ width: "140px" }}>
                    GST No
                  </Form.Label>
                  <Form.Control
                    name="gst_in_no"
                    value={form.gst_in_no || ""}
                    onChange={updateForm}
                    onKeyDown={handleKeyDown}
                  />
                </div>

                <div className="d-flex align-items-center mb-3">
                  <Form.Label className="me-3" style={{ width: "140px" }}>
                    PAN No
                  </Form.Label>
                  <Form.Control
                    name="pan_no"
                    value={form.pan_no || ""}
                    onChange={updateForm}
                    onKeyDown={handleKeyDown}
                  />
                </div>

                <div className="d-flex align-items-center mb-3">
                  <Form.Label className="me-3" style={{ width: "140px" }}>
                    Sales Tax No
                  </Form.Label>
                  <Form.Control
                    name="sales_tax_no"
                    value={form.sales_tax_no || ""}
                    onChange={updateForm}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="d-flex align-items-center mb-3">
                  <Form.Label className="me-3" style={{ width: "140px" }}>
                    Shop Act No
                  </Form.Label>
                  <Form.Control
                    name="shop_act_no"
                    value={form.shop_act_no || ""}
                    onChange={updateForm}
                    onKeyDown={handleKeyDown}
                  />
                </div>

                <div className="d-flex align-items-center mb-3">
                  <Form.Label className="me-3" style={{ width: "140px" }}>
                    IT Ward
                  </Form.Label>
                  <Form.Control
                    name="it_ward"
                    value={form.it_ward || ""}
                    onChange={updateForm}
                    onKeyDown={handleKeyDown}
                  />
                </div>

                <div className="d-flex align-items-center mb-3">
                  <Form.Label className="me-3" style={{ width: "140px" }}>
                    Shop Act Renewal Date
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="shop_act_renewal_date"
                    value={form.shop_act_renewal_date || ""}
                    onChange={updateForm}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>
            </div>

            {/* COMMISSION DETAILS */}
            <div className="row">
              <div className="col-md-6">
                <div className="d-flex align-items-center mb-3">
                  <Form.Label className="me-3" style={{ width: "140px" }}>
                    Dalali (%)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    name="dalali"
                    value={form.dalali}
                    onChange={updateForm}
                    onKeyDown={handleKeyDown}
                  />
                </div>

                <div className="d-flex align-items-center mb-3">
                  <Form.Label className="me-3" style={{ width: "140px" }}>
                    Hamali (%)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    name="hamali"
                    value={form.hamali}
                    onChange={updateForm}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="d-flex align-items-center mb-3">
                  <Form.Label className="me-3" style={{ width: "140px" }}>
                    Vatav (%)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    name="vatav"
                    value={form.vatav}
                    onChange={updateForm}
                    onKeyDown={handleKeyDown}
                  />
                </div>

                <div className="d-flex align-items-center mb-3">
                  <Form.Label className="me-3" style={{ width: "140px" }}>
                    Commission (%)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    name="commission"
                    value={form.commission}
                    onChange={updateForm}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>
            </div>

            {/* CHECKBOX AND STATUS */}
            <div className="row">
              <div className="col-md-6">
                <div className="d-flex align-items-center mb-3">
                  <Form.Check
                    type="checkbox"
                    name="is_aavak_req"
                    checked={form.is_aavak_req}
                    onChange={updateForm}
                    onKeyDown={handleKeyDown}
                    label="Is Aavak Required"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center mb-3">
                  <Form.Check
                    type="checkbox"
                    name="item_readonly"
                    checked={form.item_readonly}
                    onChange={updateForm}
                    onKeyDown={handleKeyDown}
                    label="Item Readonly"
                  />
                  <Form.Check
                    className="ms-4"
                    type="checkbox"
                    name="katala_readonly"
                    checked={form.katala_readonly}
                    onChange={updateForm}
                    onKeyDown={handleKeyDown}
                    label="Katala Readonly"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="d-flex align-items-center mb-3">
                  <Form.Label className="me-3" style={{ width: "140px" }}>
                    Status
                  </Form.Label>
                  <Form.Select
                    name="status"
                    value={form.status}
                    onChange={updateForm}
                    onKeyDown={handleKeyDown}
                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </Form.Select>
                </div>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button id="submit-btn" variant="success" onClick={saveRecord}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </>
  );
};

export default CompanyMaster;
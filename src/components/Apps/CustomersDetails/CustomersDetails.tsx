import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomerForm: React.FC = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card border-0 w-100" style={{ maxWidth: '900px' }}>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="mb-0">Customer Form</h2>
          <div className="d-flex align-items-center">
            <button className="btn btn-outline-primary text-black me-2">Add new customer</button>
            <button className="btn btn-success me-2">Refresh</button>
            <div className="input-group" style={{ width: '150px' }}>
              <input type="text" className="form-control" placeholder="Search..." />
              <button className="btn btn-outline-secondary">X</button>
            </div>
          </div>
        </div>

        {/* Customer Table */}
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Sr No</th>
                <th>C NAME</th>
                <th>COUNTRY CODE</th>
                <th>MOBILE</th>
                <th>MAIL</th>
                <th>CITY</th>
                <th>ADDRESS 1</th>
                <th>ADDRESS 2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>CC</td>
                <td>91</td>
                <td>123</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>2</td>
                <td>sder</td>
                <td>91</td>
                <td>123</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>3</td>
                <td>ASAD</td>
                <td>91</td>
                <td>123312</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>4</td>
                <td>vijay khsrgar</td>
                <td>91</td>
                <td>1234</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>5</td>
                <td>vishal</td>
                <td>91</td>
                <td>2,3</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>6</td>
                <td>211</td>
                <td>91</td>
                <td>213</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>7</td>
                <td>sonule</td>
                <td>91</td>
                <td>252</td>
                <td>-</td>
                <td>kop</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>8</td>
                <td>DD</td>
                <td>91</td>
                <td>3236</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>9</td>
                <td>sarth vatsat</td>
                <td>91</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>41</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <nav aria-label="Page navigation" className="d-flex justify-content-center mt-3">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link border rounded-0" href="#" aria-label="Previous">
                <span aria-hidden="true">Previous</span>
              </a>
            </li>
            <li className="page-item active">
              <a className="page-link border-0 bg-dark text-white" href="#">1</a>
            </li>
            <li className="page-item">
              <a className="page-link border-0" href="#">2</a>
            </li>
            <li className="page-item">
              <a className="page-link border-0" href="#">3</a>
            </li>
            <li className="page-item">
              <a className="page-link border-0" href="#">4</a>
            </li>
            <li className="page-item">
              <a className="page-link border-0" href="#">5</a>
            </li>
            <li className="page-item">
              <a className="page-link border-0" href="#">...</a>
            </li>
            <li className="page-item">
              <a className="page-link border-0" href="#">65</a>
            </li>
            <li className="page-item">
              <a className="page-link border rounded-0" href="#" aria-label="Next">
                <span aria-hidden="true">Next</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default CustomerForm;
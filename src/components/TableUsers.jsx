import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import _, { debounce } from 'lodash';
import ModalConfirm from './ModalConfirm';
import { CSVLink, CSVDownload } from "react-csv";
import Papa from "papaparse";
import { toast } from 'react-toastify';
import { Container } from 'react-bootstrap';

const TableUsers = (props) => {

  //lúc dầu thì useState sau đó sẽ lấy api cập nhật rồi chạy vào useEffect
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  // FucTion Update
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});
  //function delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false)
  const [dataUserDelete, setDataUserDelete] = useState(false);

  //fuction Sort
  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id")

  const [keyword, setKeyword] = useState("");

  const [dataExport, setDataExport] = useState([]);

  // Xử lý sự kiện khi người dùng đóng modal
  const handleClose = () => {
    // Gọi hàm handleClose từ props
    setIsShowModalAddNew(false);
    setIsShowModalEdit(false);
    setIsShowModalDelete(false);
  }
  // Xử lý sự kiện khi có cập nhật dữ liệu trong modal
  const handleUpdateTable = (user) => {

    // Gọi hàm handleUpdateTable từ props
    setListUsers([user, ...listUsers]);
  }


  const handleEditUserFromModal = (user) => {
    //lodash
    let cloneListUsers = _.cloneDeep(listUsers);
    let index = listUsers.findIndex(item => item.id === user.id);
    cloneListUsers[index].first_name = user.first_name;
    setListUsers(cloneListUsers);



  }

  //Modal Comfirm
  const handleDeleteUser = (user) => {
    setIsShowModalDelete(true);
    setDataUserDelete(user)
  }
  //Delete user khỏi table
  const handleDeleteUserFromModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = cloneListUsers.filter(item => item.id !== user.id);
    setListUsers(cloneListUsers);
  }

  // Edit
  const handleEditUser = (user) => {
    setDataUserEdit(user);
    setIsShowModalEdit(true);

  }



  //hook cung cấp bởi thư viện React để bạn có thể thực hiện các side effect trong các component
  useEffect(() => {
    //call apis
    //dry
    // tham só chuyền vào ở đây là số lượn phần tử của trang đầu tiên
    getUsers(1);
  }, []);

  //  lấy api 
  const getUsers = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {
      setListUsers(res.data);
      setTotalUsers(res.total);
      setTotalPages(res.total_pages);
    }
  }


  // chuyển trang
  const handlePageClick = (event) => {
    // thêm dấu + để convert từ string dang number
    getUsers(+ event.selected + 1)
  }
  //Sort
  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
    setListUsers(cloneListUsers); //  dòng này để cập nhật danh sách người dùng mới đã được sắp xếp
  }

  // Seach Email
  const handleSearch = debounce((event) => {
    let tern = event.target.value;
    if (tern) {
      let cloneListUsers = _.cloneDeep(listUsers);
      cloneListUsers = cloneListUsers.filter(item => item.email.includes(tern))
      setListUsers(cloneListUsers);
    } else {
      getUsers(1)
    }

  }, 500)


  // dowload file
  const getUsersExport = (event, done) => {
    let result = [];
    if (listUsers && listUsers.length > 0) {
      result.push(["id", "email", "first_name", "last_name"])
      listUsers.map((item, index) => {
        let arr = [];
        arr[0] = item.id
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name
        result.push(arr)
      })
      setDataExport(result);
      done();
    }

  }
// Import
  const handleImportCSV = (event, done) => {
    if (event.target && event.target.files && event.target.files[0]) {
      let file = event.target.files[0];

      if (file.type !== "text/csv") {
        toast.error("Only accept csv files... ");
        return;
      }

      Papa.parse(file, {
        complete: function (results) {
          let rawCSV = results.data;

          if (rawCSV.length > 0) {
            if (
              rawCSV[0] &&
              rawCSV[0].length === 4 &&

              rawCSV[0][0] === "id" &&
              rawCSV[0][1] === "email" &&
              rawCSV[0][2] === "first_name" &&
              rawCSV[0][3] === "last_name"
            ) {
              let tempUsers = [];

              for (let i = 1; i < rawCSV.length; i++) {
                let item = rawCSV[i];

                if (item.length === 4) {
                  let obj = {
                    id: item[0],
                    email: item[1],
                    first_name: item[2],
                    last_name: item[3],
                  };

                  tempUsers.push(obj);
                }
              }
              toast.success("import success")
              setListUsers(tempUsers);
            } else {
              toast.error("Wrong format Header CSV file!");
            }
          } else {
            toast.error("Not found data in CSV file!");
          }
        },
      });
    }
  };


  return (<>
  <Container className='bg-light'>
    <div className='my-1  justify-content-between add-new d-sm-flex'>
      <span className><b>List Users  :</b> </span>
      <div className='group-btns mt-sm-0 mt-2'></div>
      <div className='group-btns '>
        <button className='btn btn-success'
          onClick={() => setIsShowModalAddNew(true)}><i className="fa-solid fa-plus"></i> Add new</button>

        <label className='btn btn-warning mx-1 ' htmlFor='import'> <i className='fa-solid fa-file-import'></i>  Import</label>

        <input
          id='import' type='file' hidden
          onChange={(event) => handleImportCSV(event)} />

        <CSVLink
          filename={"my-file.csv"}
          className="btn btn-primary"

          asyncOnClick={true}
          onClick={getUsersExport}
          data={dataExport}
        > <i className="fa-solid fa-file-arrow-down"></i>Download me</CSVLink>


      </div>
    </div>
    <div className='col-12 col-sm-4 my-3'>
      <input onChange={(event) => handleSearch(event)}

        type="text" className='form-control' placeholder='Search user by email...' />
    </div>
    <div className='col-12 ' >
      <Table striped bordered hover className=''>
        <thead>
          <tr>
            <th className='sort-header my-3 d-flex justify-content-between'>
              <span>ID</span>
              <span>
                <i
                  class="fa-solid fa-arrow-down-long"
                  onClick={() => handleSort("desc", "id")}
                ></i>
                <i
                  class="fa-solid fa-arrow-up-long"
                  onClick={() => handleSort("asc", "id")}
                ></i>
              </span>
            </th>
            <th className='sort-header'> Email </th>
            <th className='sort-header  my-3 d-flex justify-content-between'>
              <span> first Name</span>
              <span>
                <i
                  className="fa-solid fa-arrow-down-long"
                  onClick={() => handleSort("desc", "first_name")}
                ></i>
                <i
                  className="fa-solid fa-arrow-up-long"
                  onClick={() => handleSort("asc", "first_name")}
                ></i>
              </span>
            </th>
            <th className='sort-header'>Last Name</th>

          </tr>
        </thead>

        <tbody>
          {listUsers && listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`users-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>

                    <button className='btn btn-warning mx-3'
                      onClick={() => handleEditUser(item)}>
                      Edit</button>
                    <button className='btn btn-danger '
                      onClick={() => handleDeleteUser(item)}>
                      Delete </button>
                  </td>

                </tr>)
            })}
        </tbody>
      </Table >
    </div>
    {/* ReactPaginate */}

    < ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={totalPages}
      previousLabel="< previous"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="pagination"
      activeClassName="active"
      renderOnZeroPageCount={null}
    />
    {/* callBack */}
    <ModalAddNew
      show={isShowModalAddNew}
      handleClose={handleClose}
      handleUpdateTable={handleUpdateTable}
    />
    {/* callBack */}
    <ModalEditUser
      show={isShowModalEdit}
      handleClose={handleClose}
      dataUserEdit={dataUserEdit}
      handleEditUserFromModal={handleEditUserFromModal}
    />
    {/* callBack */}
    <ModalConfirm
      show={isShowModalDelete}
      handleClose={handleClose}
      dataUserDelete={dataUserDelete}
      handleDeleteUserFromModal={handleDeleteUserFromModal}
      
    />
    </Container>
  </>)
}

export default TableUsers
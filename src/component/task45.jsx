import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

/* 
Gọi dữ liệu products từ "https://dummyjson.com/products"
Danh sách sản phẩm mặc định với giá trị mặc định là page = 1, limit = 12
Tạo tính năng phân trang với nút next, preview (khuyến khích sử dụng icon cho giao diện)
Có thể thay đổi được số lượng sản phẩm hiển thị trên 1 trang với select...option.
Tạo tính năng sắp xếp sản phẩm theo giá từ thấp đến cao, từ cao đến thấp, hủy sắp xếp.
Tạo tính năng tìm kiếm theo tên sản phẩm (không phân biệt hoa thường)
Deploy lên vercel và nộp lại link deploy.
 */
const url = 'https://dummyjson.com/products'



const Task45 = () => {
    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1)
    const [seach , setSeach] = useState('')
    const [sort , setSort] = useState('default')
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(`${url}?limit=12&skip=${(page - 1) * 12}`)
            const data = await response.json()
            setProducts(data.products)
        }
        fetchProducts()
    }, [page])
    const handlePage = (page) => {
        if (page === 'prev') {
            setPage((prevPage) => Math.max(prevPage - 1, 1))
        } else if (page === 'next') {
            setPage((prevPage) => prevPage + 1)
        }
    }
   const handleChangeLimit = (e) => {
        const limit = e.target.value
        const fetchProducts = async () => {
            const response = await fetch(`${url}?limit=${limit}&skip=${(page - 1) * limit}`)
            const data = await response.json()
            setProducts(data.products)
        }
        fetchProducts()
    }
    const handleSort = (sort) => {
        setSort(sort)
        if (sort === 'asc') {
            const sortedProducts = [...products].sort((a, b) => a.price - b.price)
            setProducts(sortedProducts)
        } else if (sort === 'desc') {
            const sortedProducts = [...products].sort((a, b) => b.price - a.price)
            setProducts(sortedProducts)
        } else {
            const fetchProducts = async () => {
                const response = await fetch(`${url}?limit=12&skip=${(page - 1) * 12}`)
                const data = await response.json()
                setProducts(data.products)
            }
            fetchProducts()
        }
    }
    const handlseach = (e) => {
        setSeach(e.target.value)
    }
    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(seach.toLowerCase())
    )
    
    



  return (
  <div className="container mt-5">
  <h1 className="mb-4 text-center">Danh sách sản phẩm</h1>

  {/* Search + Sort */}
  <div className="row mb-3">
    <div className="col-md-6">
      <input
        type="text"
        onChange={handlseach}
        placeholder="Tìm kiếm sản phẩm"
        className="form-control"
      />
    </div>
    <div className="col-md-6 d-flex align-items-center gap-2">
      <button
        onClick={() => setProducts(filteredProducts)}
        className="btn btn-primary w-160"
      >
        Tìm kiếm
      </button>
    </div>

  </div>

  {/* Product Table */}
  <div className="table-responsive">
    <table className="table table-bordered table-hover">
      <thead className="table-light">
        <tr>
          <th>ID</th>
          <th>Tên</th>
          <th>Giá  <select
        id="sort"
        onChange={(e) => handleSort(e.target.value)}
        className="form-select"
      >
        <option value="default">Mặc định</option>
        <option value="asc">Tăng dần</option>
        <option value="desc">Giảm dần</option>
      </select></th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.title}</td>
            <td>{product.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Pagination & Page Size */}
  <div className="row align-items-center mt-4">
    <div className="col-md-6 d-flex align-items-center gap-2">
      <button
        className="btn btn-secondary"
        onClick={() => handlePage("prev")}
        disabled={page === 1}
      >
        Prev
      </button>
      <span className="mx-2">Trang {page}</span>
      <button className="btn btn-secondary" onClick={() => handlePage("next")}>
        Next
      </button>
    </div>
    <div className="col-md-6 text-md-end mt-3 mt-md-0">
      <label htmlFor="limit" className="form-label me-2">
        Số lượng / trang:
      </label>
      <select
        id="limit"
        onChange={handleChangeLimit}
        className="form-select d-inline-block w-auto"
      >
        <option value="12">12</option>
        <option value="24">24</option>
        <option value="36">36</option>
        <option value="48">48</option>
        <option value="60">60</option>
        <option value="194">Tất cả</option>
      </select>
    </div>
  </div>
</div>

  )
}

export default Task45
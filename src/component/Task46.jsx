

import useFetchList from '../assets/hooks/useFetchList'
import useQuery from '../assets/hooks/useQuery';

const sortByOptions = [
    {label : "Mặc Định", value: {sorby : "title" , order : "asc"}},
    {label : "Giá tăng Dần", value: {sorby : "price" , order : "asc"}},
    {label : "Giá giảm Dần", value: {sorby : "price" , order : "desc"}},
    {label : "Tên A-Z", value: {sorby : "title" , order : "asc"}},
    {label : "Tên Z-A", value: {sorby : "title" , order : "desc"}},
    {label : "Mới nhất", value: {sorby : "createdAt" , order : "desc"}},
    {label : "Cũ nhất", value: {sorby : "createdAt" , order : "asc"}},
    {label : "Lượt đánh giá cao nhất ", value: {sorby : "rating" , order : "desc"}},    

    

]
const Task46 = () => {
    const [query, updateQuery , resetQuery] = useQuery({
        q: "",
        page : 1,
        limit : 12,
        sortBy : "title",
        order : "asc",
        

    })
    const [data] = useFetchList("products", query , {});
    console.log(data);
    const handlSearch = (data) => {
     updateQuery({
        q: data, page : 1
     })        

    }
    const handlSort = (indexOtp) => {
        console.log(indexOtp);
        updateQuery({
            sortBy : sortByOptions[indexOtp].value.sorby,
            order : sortByOptions[indexOtp].value.order,
            page : 1
        })
    
    }
    const handlePage = (newpage) => {
        updateQuery({
            page: newpage
        })
    }
    const HandlLimit = (newLimit) => {
        console.log(newLimit);
        updateQuery({
            limit : newLimit.limit,
            page : 1
        })
    }

  return (
  <div className="max-w-6xl mx-auto p-6 space-y-6">
  <h1 className="text-3xl font-bold text-gray-800">Danh sách sản phẩm</h1>

  {/* Bộ lọc và tìm kiếm */}
  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
    <div className="flex items-center gap-2">
      <span className="text-gray-600">Hiển thị tối đa</span>
      <select
        className="border border-gray-300 rounded px-3 py-1"
        onChange={(e) => HandlLimit({ limit: e.target.value })}
      >
        <option value="12">12</option>
        <option value="24">24</option>
        <option value="36">36</option>
        <option value="48">48</option>
      </select>
      <span className="text-gray-600">sản phẩm</span>
    </div>

    <input
      type="text"
      placeholder="Tìm kiếm..."
      className="border border-gray-300 rounded px-3 py-1 w-full md:w-1/3"
      onChange={(e) => handlSearch(e.target.value)}
    />

    <select
      className="border border-gray-300 rounded px-3 py-1"
      onChange={(e) => handlSort(e.target.value)}
    >
      {sortByOptions.map((opt, index) => (
        <option key={index} value={index}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>

  {/* Danh sách sản phẩm */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {data &&
      data.map((item) => (
        <div
          key={item.id}
          className="border rounded-lg p-4 shadow hover:shadow-lg transition duration-200"
        >
          <h2 className="font-semibold text-lg text-gray-800">{item.title}</h2>
            <img
                src={item.images}
                alt={item.title}
                className="w-full h-48 object-cover rounded mt-2"
            />
          <p className="text-blue-600 font-bold">{item.price}₫</p>
        </div>
      ))}
  </div>

  {/* Điều hướng phân trang */}
  <div className="flex items-center justify-center gap-4 pt-6">
    <button
      className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
      onClick={() => handlePage(query.page - 1)}
      disabled={query.page === 1}
    >
      Previous
    </button>
    <span className="text-gray-600">Trang: {query.page}</span>
    <button
      className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
      onClick={() => handlePage(query.page + 1)}
    >
      Next
    </button>
  </div>
</div>

  )
}

export default Task46
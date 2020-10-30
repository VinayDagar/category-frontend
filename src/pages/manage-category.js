import React, { useEffect, useState } from 'react';
import { Select, Pagination } from 'antd';
import { ReactSortable } from "react-sortablejs";
import {  uniqBy } from 'lodash';

const { Option } = Select;

const ManageCategory = () => {

    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [categoryId, setCategoryId] = useState(null)
    const [totalItems, setTotalItem] = useState(0);
    const [filterOption, setFilterOptions] = useState([]);

    useEffect(() => {
        getSubCategories();
    }, [pageSize, currentPage])

    const getSubCategories = async () => {
        try {
            const query = {
                limit: pageSize,
                skip: (currentPage - 1) * pageSize
            }

            if (categoryId) {
                query.categoryId = categoryId
            }
            const result = await window.$http.get('category/sub-category-list', query)

            setItems(result.categories.data)
            setCategories(result.categories.data)
            setTotalItem(result.categories.count)


            let options = result.categories.data.map(a => ({ title: a.category.name, value: a.category._id }))
            options = uniqBy(options, 'value')
            setFilterOptions(options)

        } catch (err) {
            console.log(err)
            window.$utility.showErrorMessage(err.message)
        }
    }

    const handlePaginationChange = async (page) => {
        setCurrentPage(page)

    }

    const handleFilterChange = (val) => {
        if (!val) {
            setItems(categories)
        } else {
            const list = categories.filter(a => a.category._id === val)
            setItems(list)
        }
    }
    const handlePageSizeChange = (current, size) => {
        setPageSize(size)
    }

    return (
        <div className="container my-3">
            <div className="row">
                <div>
                    <Select placeholder="Select Super categories" allowClear={true} onChange={handleFilterChange}>
                        {
                            filterOption.map(a => (
                                <Option key={a.value} value={a.value}> { a.title} </Option>
                            ))
                        }
                    </Select>
                </div>
                <div className="col-sm-10">
                    <div className="card p-3 m-3">
                        <div className="row">
                            <div className="col-sm-4"> Id </div>
                            <div className="col-sm-4"> Name </div>
                            <div className="col-sm-4"> Category </div>
                        </div>
                    </div>
                    <ReactSortable list={items} setList={setItems} >
                        {items.map(a => (
                            <div className="card p-3 m-3">
                                <div className="row" key={a._id}>
                                    <div className="col-sm-4"> {a._id} </div>
                                    <div className="col-sm-4"> {a.name} </div>
                                    <div className="col-sm-4"> {a.category.name} </div>
                                </div>
                            </div>
                        ))
                        }
                    </ReactSortable>
                </div>
                <Pagination
                    showTotal={total => `Total ${total} items`}
                    pageSize={pageSize}
                    showSizeChanger
                    onShowSizeChange={handlePageSizeChange}
                    onChange={handlePaginationChange}
                    current={currentPage}
                    total={totalItems}
                    pageSizeOptions={[5, 10, 15]}
                />
            </div>
        </div>
    )
}

export default ManageCategory

import React from 'react'

const Input = (props) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <form className="searchForm">
                        <div className="form-group">
                            <input onChange={e => props.handleChange(e.target.value)} type="text" className="form-control input-search" id="searchInput" placeholder="Start enter film"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};
export default Input;

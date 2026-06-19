import React from 'react'

const Jumbotron = ({ h1, p, small }) => {
    return (
        < div className="jbtron rounded px-4 py-4 py-sm-5 text-center border border-info my-4 w-100" >
            <h1 className="fw-bolder text-white display-6">
                {h1}
            </h1>

            <p className="text-white mt-2 mb-1">
                {p}
            </p>

            <small className="text-white mb-0">
                {small}
            </small>

            <hr
                className="my-3"
                style={{
                    height: "2px",
                    borderWidth: 0,
                    backgroundColor: "var(--brand)",
                }}
            />
        </div >
    )
}

export default Jumbotron

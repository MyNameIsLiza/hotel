import './Modal.css';


function Modal({active, setActive, children, header}) {

    return (
        <div className={active?"Modal active":"Modal"}>
            <div className="Modal-content">
                <div className="Modal-content-header">
                    <h3 className="Modal-header">{header}</h3>
                    <button className="close-button" onClick={() => setActive(false)}>🞪</button>
                </div>

                {children}
            </div>
        </div>
    );
}

export default Modal;

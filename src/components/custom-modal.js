import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';

export default (props) => {

    const [visible, setVisibility] = useState(false);


    useEffect(() => {
        setVisibility(props.showModal);
    }, [props.showModal])

    const handleCancel = (e) => {
        setVisibility(false);
        props.onClose();
    };

    return (
        <span>
            <Modal
                title={props.title}
                centered
                visible={visible}
                onCancel={handleCancel}
                footer={null}
                width={props.width}
            >
                {props.children}
            </Modal>
        </span>
    );
}

// CustomModal.defaultProps = {
//     label: 'open Modal',
//     buttonType: 'primary',
//     Icon: 'plus',
//     modaltittle: 'Modal Tittle',
//     buttonsize: 'default'
// };

// CustomModal.propTypes = {
//     label: PropTypes.string,
//     buttonType: PropTypes.string,
//     Icon: PropTypes.string,
//     modaltittle: PropTypes.string,
//     buttonsize: PropTypes.string,
//     width: PropTypes.string,
//     tooltip: PropTypes.string,
// };

// export default CustomModal;

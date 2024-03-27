import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from 'react-bootstrap';
import RangeSlider from "react-bootstrap-range-slider";
import 'bootstrap/dist/css/bootstrap.min.css';

export const UniversalModal = ({ show, onHide, onConfirm, confirmText, title, formElements }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const initialData = {};
        formElements.forEach(element => {
            initialData[element.id] = element.initialValue || '';
        });
        setFormData(initialData);
    }, [show]);

    const handleChange = (e, fieldName, optionalOnChange) => {
        const { value } = e.target;
        setFormData({ ...formData, [fieldName]: value });
        if (optionalOnChange) {
            optionalOnChange(e);
        }
    };

    const handleSliderChange = (value, fieldName, optionalOnChange) => {
        setFormData({ ...formData, [fieldName]: value });
        if (optionalOnChange) {
            optionalOnChange(value);
        }
    };

    const handleSelectChange = (e, fieldName, optionalOnChange) => {
        const { value, options } = e.target;
        let updatedValue = Array.from(options)
            .filter((option) => option.selected)
            .map((option) => option.value);

        setFormData({ ...formData, [fieldName]: updatedValue });

        if (optionalOnChange) {
            optionalOnChange(updatedValue);
        }
    };

    const handleSingleSelectChange = (e, fieldName, optionalOnChange) => {
        const { value } = e.target;

        setFormData({ ...formData, [fieldName]: value });

        if (optionalOnChange) {
            optionalOnChange(value);
        }
    };

    const handleSubmit = () => {
        onConfirm(formData);
        onHide();
    };

    return (
         show?
    <Modal show={show} onHide={onHide} restoreFocus={true} backdrop={"static"}>
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={() => handleSubmit()}>
                {formElements.map((element, index) => (
                    <Form.Group key={index} className={"my-1"} controlId={element.id}>
                        <Form.Label>{element.label}</Form.Label>
                        {element.type === 'textarea' ? (
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={formData[element.id] || ''}
                                onChange={(e) => handleChange(e, element.id, element.onChange)}
                                placeholder={element.placeholder}
                            />
                        ) : element.type === 'range' ? (
                            <>
                                <RangeSlider
                                    tooltip={"off"}
                                    value={formData[element.id] || 0}
                                    onChange={(e) => handleSliderChange(e.target.value, element.id, element.onChange)}
                                    max={element.max || 100}
                                    min={element.min || 0}
                                    className={"w-100"}
                                />
                                <br />
                                <Form.Label>{formData[element.id]}</Form.Label>
                            </>
                        ) : element.type === 'select' ? (
                            <Form.Control
                                as="select"
                                value={formData[element.id] || ''}
                                onChange={(e) => handleSingleSelectChange(e, element.id, element.onChange)}
                            >
                                {element.options.map((option, index) => (
                                    <option key={index} value={option.id}>{option.name}</option>
                                ))}
                            </Form.Control>
                        ) : element.type === 'multiselect' ? (
                            <Form.Control
                                as="select"
                                multiple
                                value={formData[element.id] || []}
                                onChange={(e) => handleSelectChange(e, element.id, element.onChange)}
                            >
                                {element.options.map((option, index) => (
                                    <option key={index} value={option.id}>{option.name}</option>
                                ))}
                            </Form.Control>
                        ) : (
                            <Form.Control
                                type={element.type}
                                placeholder={element.placeholder}
                                value={formData[element.id] || ''}
                                onChange={(e) => handleChange(e, element.id, element.onChange)}
                            />
                        )}
                    </Form.Group>
                ))}
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
                Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
                {confirmText}
            </Button>
        </Modal.Footer>
    </Modal> : <></>

    );
};
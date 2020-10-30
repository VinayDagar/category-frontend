import React, { Component } from 'react';
import { Form, Input } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { Controller, ErrorMessage } from 'react-hook-form';


const Error = (props) => {
    return (<ErrorMessage errors={props.err} name={props.name}>
        {({ message, messages }) => {
            if (messages) {
                return (
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                        <span key={type} className="text-danger warning-msg">{message}</span>
                    ))
                );
            }
            return <span className="text-danger warning-msg">{message}</span>
        }}
    </ErrorMessage>
    );
}

const TextField = (props) => {
    return (
        <div className="position-relative ant-form-vertical">
            <Form.Item className="from-field-input" label={props.label}>
                <Controller
                    as={
                        <Input
                            placeholder={props.placeholder}
                            style={props.style}
                            disabled={props.disabled ? props.disabled : false}
                            allowClear={props.allowClear ? props.allowClear : false}
                            prefix={props.prefix}
                            suffix={props.suffix}
                            {...props.rest}
                        />
                    }
                    rules={props.inputType === "email" && props.showEmailError ? {
                        ...props.rules, pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/,
                            message: 'Invalid Email'
                        }
                    } : props.rules}
                    onChange={([event]) => {
                        if (props.onChange) {
                            props.onChange(event.target.value);
                        }
                        return event.target.value;
                    }}
                    name={props.attribute}
                    control={props.control}
                />
            </Form.Item>
            <Error err={props.errors} name={props.attribute} />
        </div>
    );
};

const TextArea = (props) => {
    return (
        <div className="position-relative ant-form-vertical">
            <Form.Item className="from-field-input" label={props.label}>
                <Controller
                    as={
                        <Input.TextArea
                            placeholder={props.placeholder}
                            style={props.style}
                            disabled={props.disabled ? props.disabled : false}
                            allowClear={props.allowClear ? props.allowClear : false}
                            {...props.rest}
                        />
                    }
                    rules={props.rules}
                    name={props.attribute}
                    control={props.control}
                />
            </Form.Item>
            <Error err={props.errors} name={props.attribute} />
        </div>
    );
};

const TextNumber = (props) => {
    return (
        <div className="position-relative ant-form-vertical">
            <Form.Item className="from-field-input" label={props.label}>
                <Controller
                    as={
                        <Input
                            placeholder={props.placeholder}
                            style={props.style}
                            disabled={props.disabled ? props.disabled : false}
                            allowClear={props.allowClear ? props.allowClear : false}
                            {...props.rest}
                        />
                    }
                    maxLength={props.maxLength}
                    minLength={props.minLength}
                    rules={props.inputType === "text-number" ? {
                        ...props.rules, validate: {
                            value: /^[0-9]*$/,
                            message: 'Invalid number!'
                        }, pattern: {
                            value: /^[0-9]*$/,
                            message: 'Invalid number!'
                        }
                    } : props.rules}
                    name={props.attribute}
                    control={props.control}
                />
            </Form.Item>
            <Error err={props.errors} name={props.attribute} />
        </div>
    );
};

const TextOnly = (props) => {
    return (
        <div className="position-relative ant-form-vertical">
            <Form.Item className="from-field-input" label={props.label}>
                <Controller
                    as={
                        <Input
                            placeholder={props.placeholder}
                            style={props.style}
                            disabled={props.disabled ? props.disabled : false}
                            allowClear={props.allowClear ? props.allowClear : false}
                            {...props.rest}
                        />
                    }
                    rules={props.inputType === "text-only" ? {
                        ...props.rules, validate: {
                            value: /^[a-zA-Z ]+$/,
                            message: 'Invalid text!'
                        }, pattern: {
                            value: /^[a-zA-Z ]+$/,
                            message: 'Invalid text!'
                        }
                    } : props.rules}
                    name={props.attribute}
                    control={props.control}
                />
            </Form.Item>
            <Error err={props.errors} name={props.attribute} />
        </div>
    );
};

const TextName = (props) => {
    return (
        <div className="position-relative ant-form-vertical">
            <Form.Item className="from-field-input" label={props.label}>
                <Controller
                    as={
                        <Input
                            placeholder={props.placeholder}
                            style={props.style}
                            disabled={props.disabled ? props.disabled : false}
                            allowClear={props.allowClear ? props.allowClear : false}
                            {...props.rest}
                        />
                    }
                    rules={props.inputType === "text-name" ? {
                        ...props.rules, validate: {
                            value: /^[a-zA-Z. _%+-]+$/,
                            message: 'Invalid text!'
                        }, pattern: {
                            value: /^[a-zA-Z. _%+-]+$/,
                            message: 'Invalid text!'
                        }
                    } : props.rules}
                    name={props.attribute}
                    control={props.control}
                />
            </Form.Item>
            <Error err={props.errors} name={props.attribute} />
        </div>
    );
};

const Password = (props) => {
    return (
        <div className="position-relative ant-form-vertical">
            <Form.Item className="from-field-input" label={props.label}>
                <Controller
                    as={
                        <Input.Password
                            placeholder={props.placeholder}
                            disabled={props.disabled ? props.disabled : false}
                            allowClear={props.allowClear ? props.allowClear : false}
                            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,0.7)' }} />}
                            {...props.rest}
                        />
                    }
                    rules={props.rules}
                    name={props.attribute}
                    control={props.control}
                    onChange={props.onChange}
                />
            </Form.Item>
            <Error err={props.errors} name={props.attribute} />
        </div>
    );
};

class FormFieldInput extends Component {
    render() {
        switch (this.props.inputType) {
            case 'textarea':
                return <TextArea {...this.props} />;
            case 'text-number':
                return <TextNumber {...this.props} />;
            case 'text-only':
                return <TextOnly {...this.props} />;
            case 'text-name':
                return <TextName {...this.props} />;
            default:
                return <TextField {...this.props} />;
        }
    }
}

FormFieldInput.defaultProps = {
    inputType: 'text',
    inputClass: 'form-control',
    required: false,
    disabled: false,
    showLabel: true,
    showErrors: false,
    showSearch: false,
    items: [],
    label: '',
    errors: null,
    rest: {},
    options: [],
    rules: {},
    format: 'hh:mm:ss a',
    showEmailError: true
};

FormFieldInput.propTypes = {
    inputType: PropTypes.string,
    handleChange: PropTypes.func,
    inputClass: PropTypes.string,
    attribute: PropTypes.string,
    value: PropTypes.any,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    showLabel: PropTypes.bool,
    showErrors: PropTypes.bool,
    showSearch: PropTypes.bool,
    falseCheckboxText: PropTypes.string,
    trueCheckboxText: PropTypes.string,
    validation: PropTypes.string,
    items: PropTypes.array,
    prefix: PropTypes.object,
    suffix: PropTypes.object,
    maxLength: PropTypes.number,
    style: PropTypes.any,
    errors: PropTypes.object,
    rest: PropTypes.any,
    options: PropTypes.array,
    rules: PropTypes.object,
    control: PropTypes.any,
    format: PropTypes.string,
    showEmailError: PropTypes.bool
};

export default FormFieldInput;

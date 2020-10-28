import React from 'react'

const renderField = ({ input, label, type, asterisk, meta: { touched, error }, className, rows, disabled, placeholder, selectWrapperClass, children, maxLength, id, multiple, onKeyPress, options, value }) => {
    let fieldType = null;
    switch (type) {
        case "textarea":
            fieldType = <textarea id={input.name} className={className} rows={typeof (rows) == "undefined" ? "6" : rows} disabled={disabled} placeholder={placeholder} {...input} ></textarea>;
            break;
        case "text": case "checkbox": case "radio": case "password":
            fieldType = <input id={id ? id : input.name} {...input} className={className} type={type} placeholder={placeholder} disabled={disabled} max={maxLength} onKeyPress={onKeyPress} />;
            break;
        case "file":
            fieldType = <input id={id ? id : input.name} {...input} className={className} type={type} placeholder={placeholder} disabled={disabled} max={maxLength} onKeyPress={onKeyPress} value={value} />;
            break;
        case "select":
            fieldType = <select id={input.name} {...input} className={className} disabled={disabled} multiple={multiple}> {children} </select>;
            break;
        default:
            fieldType = <input id={input.name} {...input} type={type} placeholder={placeholder} />;
    }
    if (type === 'select') {
        return (
            <>
                <label>{label}{asterisk ? <span className="star-mandatory">*</span> : ''}</label>
                    <div className={selectWrapperClass}>
                        {fieldType}
                    </div>
                {touched && error &&
                    <span className="text-danger">{error}</span>
                }
            </>
        )
    }
    else {
        return (
            <>
                <label>{label}{asterisk ? <span className="star-mandatory">*</span> : ''}</label>
                    <span>
                        {fieldType}
                    </span>
                {touched && error &&
                    <span className="text-danger">{error}</span>
                }
            </>

        )
    }

};

//     <div>
//       <div>
//         <input {...input} placeholder={label} type={type} />
//         {touched && error && <span>{error}</span>}
//       </div>
//     </div>
// );

export default renderField; 
/* eslint-disable react/prop-types */

export default function InputForm({
  classname,
  labelName,
  register,
  errormessage,
  placeholder,
  type,
  classNameLabel,
  classNameicon,
  classNameI,
}) {
  // const registerResult = register && name ? register(name) : null;
  return (
    <div className="input-box">
      <span className={classNameicon}>
        <i className={classNameI} />
      </span>
      <input type={type} placeholder={placeholder} {...register} />
      <label className={classNameLabel}>{labelName}</label>
      <div style={{ minHeight: 25, color: "#FF0000" }}>{errormessage}</div>
    </div>
  );
}

export function Input(props) {
  return (
    <input
      className={`dark:text-white my-[4px] text-black dark:bg-black bg-white block  w-full px-2 py-2  border-solid border-[2px] rounded-md dark:border-white border-gray-300 ${props.className}`}
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    />
  );
}

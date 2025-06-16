const Checkbox = ({ id, checked, onChange }) => {
  return (
    <>
      <input
        id={id}
        type="checkbox"
        className="h-4 w-4 text-primary border-muted rounded focus:ring-2 focus:ring-primary"
        checked={checked}
        onChange={onChange}
      />
    </>
  );
};

export default Checkbox;

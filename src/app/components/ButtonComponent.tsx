interface IButtonComponent {
  title: string;
}

const ButtonComponent = ({ title }: IButtonComponent) => {
  return (
    <button className="hover:bg-sweet text-xs xl:text-base hover:font-bold truncate whitespace-nowrap w-full max-w-full p-6 transition-all duration-100">
      {title}
    </button>
  );
};

export default ButtonComponent;

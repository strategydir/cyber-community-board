interface IButtonComponent {
  title: string;
  link: string;
}

const LinkButtonComponent = ({ title, link }: IButtonComponent) => {
  const handleClick = () => {
    // Redirect to https://www.google.com
    // window.location.href = link;
    // Alternatively, to open in a new tab
    window.open(link, "_blank");
  };

  return (
    <button
      className="hover:bg-sweet text-xs xl:text-base hover:font-bold truncate whitespace-nowrap w-full max-w-full p-6 transition-all duration-100"
      onClick={() => {
        handleClick();
      }}
    >
      {title}
    </button>
  );
};

export default LinkButtonComponent;

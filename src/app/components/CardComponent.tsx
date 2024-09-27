interface ICardComponent {
  title: string;
  children?: React.ReactNode;
  className?: string | undefined;
}

const CardComponent = ({ title, children, className = "" }: ICardComponent) => {
  return (
    <div
      className={
        "bg-lightSweet border-2 rounded-xl border-lavenderBlue text-center py-5 drop-shadow-xl " +
        className
      }
    >
      <h3 className="text:lg xl:text-2xl font-bold text-darkCornflowerBlue pb-5">
        {title}
      </h3>
      {children}
    </div>
  );
};

export default CardComponent;

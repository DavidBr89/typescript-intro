import React, {
  ButtonHTMLAttributes,
  CSSProperties,
  InputHTMLAttributes,
  MouseEventHandler,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useState,
} from "react";

// // type ButtonProps = {
//   title: string;
// };

// type MergedButtonProps = ButtonProps & PropsWithChildren;

interface IButtonProps
  extends PropsWithChildren,
    ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

const Button = (props: IButtonProps): ReactNode => {
  const [input, setInput] = useState<string | null>(null);

  const isNull = true;

  useEffect(() => {
    console.log(input);
  }, [input]);

  if (isNull) {
    return null;
  }

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    console.log(event.target);
  };

  //   return (
  //     <div>
  //       {/* <p>{props.title}</p> */}
  //       <button onClick={handleClick}>{props.title}</button>
  //       {input ? (
  //         <input
  //           value={input}
  //           onChange={(event) => {
  //             setInput(event.target.value);
  //           }}
  //         />
  //       ) : null}

  //       <h1>{input}</h1>
  //       {props.children}
  //     </div>
  //   );

  return (
    <button className="bg-slate-300" {...props}>
      {props.children}
    </button>
  );
};

export default Button;

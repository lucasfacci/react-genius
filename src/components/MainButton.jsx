import '../styles/styles.css';

export function MainButton(props) {
    return (
        <>
            <button id="main" onClick={props.onclick} className="start" type="button">{props.children}</button>
        </>
    );
}
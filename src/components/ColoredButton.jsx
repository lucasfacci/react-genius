import '../styles/styles.css';

export function ColoredButton(props) {
    return (
        <div onClick={props.onclick} id={props.id} className="button" style={props.style}>
        </div>
    );
}
import './Avatar.scss';

const Avatar = ({img, onClick}) => {
    return (
        <div className="avatar-element" onClick={onClick}>
            <div 
                className={`avatar avatar-circle ${img.size} ${img.border && 'avatar-border'}`} 
                style={{ backgroundImage: `url(${img.src})` }}
            ></div>
        </div>
    );
}
 
export default Avatar;
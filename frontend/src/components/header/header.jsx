import "./header.css"

export default function Header() {
  return (
    <div className='header'>
        <div className="headerTitles">
        <span className="headerTitleSm">React & Node</span>
        <span className="headerTitleLg">BLOG</span>
        </div>
        <img
        className="headerImg"
        src="https://www.worldatlas.com/r/w1200/upload/80/ee/35/shutterstock-740093419.jpg"
        alt=""
      />
    </div>
  )
}

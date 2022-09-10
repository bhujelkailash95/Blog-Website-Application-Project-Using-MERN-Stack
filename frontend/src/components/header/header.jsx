import "./header.css"

export default function Header() {
  return (
    <div className='header'>
        <div className="headerTitles">
        <span className="headerTitleSm">Let's get started with</span>
        <span className="headerTitleLg">Blog Writing</span>
        </div>
        <img
        className="headerImg"
        src="https://www.worldatlas.com/r/w1200/upload/80/ee/35/shutterstock-740093419.jpg"
        alt=""
      />
    </div>
  )
}

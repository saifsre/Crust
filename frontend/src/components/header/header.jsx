import React from 'react';
import {
	Nav,
	NavItem,
	Navbar,
	NavbarBrand,
	Collapse,
	DropdownItem,
	Button,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu
} from 'reactstrap';

import profilephoto from '../../assets/images/users/1.jpg';

/*--------------------------------------------------------------------------------*/
/* Import images which are need for the HEADER                                    */
/*--------------------------------------------------------------------------------*/
import logodarkicon from '../../assets/images/crustlogo.png';
import logolighticon from '../../assets/images/crustlogo.png';
import logodarktext from '../../assets/images/crustlogo.png';
import logolighttext from '../../assets/images/crustlogo.png';

var logoStyle = {
	height : '95px',
	width : '95px,'
}

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.showMobilemenu = this.showMobilemenu.bind(this);
		this.state = {
			isOpen: false
		};
	}
	/*--------------------------------------------------------------------------------*/
	/*To open NAVBAR in MOBILE VIEW                                                   */
	/*--------------------------------------------------------------------------------*/
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}
	/*--------------------------------------------------------------------------------*/
	/*To open SIDEBAR-MENU in MOBILE VIEW                                             */
	/*--------------------------------------------------------------------------------*/
	showMobilemenu() {
		document.getElementById('main-wrapper').classList.toggle('show-sidebar');
	}

	render() {
		return (
			<header className="topbar navbarbg">
				<Navbar className="top-navbar" dark expand="md">
					<div className="navbar-header" id="logobg" data-logobg="skin6">
						{/*--------------------------------------------------------------------------------*/}
						{/* Logos Or Icon will be goes here for Light Layout && Dark Layout                */}
						{/*--------------------------------------------------------------------------------*/}
						<NavbarBrand href="/">
							<b className="logo-icon">
								<img   style = {logoStyle}src={logodarkicon} alt="homepage" className="dark-logo" />
							</b>
						</NavbarBrand>
						{/*--------------------------------------------------------------------------------*/}
						{/* Mobile View Toggler  [visible only after 768px screen]                         */}
						{/*--------------------------------------------------------------------------------*/}
						<a className="nav-toggler d-block d-md-none" onClick={this.showMobilemenu}>
							<i className="ti-menu ti-close" />
						</a>
					</div>
					
				</Navbar>
			</header>
		);
	}
}
export default Header;

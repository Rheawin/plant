import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import firebase from '../../firebase/firebase';
import _ from 'lodash';

class Header extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      randomIçerik: '',
    };
  }
  componentWillMount = () => { firebase.database().ref('kategoriler').on('value', snapshot => {
    this.setState({randomIçerik: _.values(snapshot.val())[Math.floor(Math.random() * _.values(snapshot.val()).length)].key})
   })}
  render(){
  return (
    <div>
      <div className="header">
        {/* =========== LOGO BURAYA EKLENECEK ============*/}
        <Link to={'/içerik/'+this.state.randomIçerik} className="logo">
          PLANT.LOGO
        </Link>
        {/* =========== HEADER - KULLANICI KISMI ============*/}
        <div className="header-right">
          <img
            lt="user"
            className="user"
            src="../images/farmer1.png"
            height="48px"
          />
          <label className="nickname">
            {firebase.auth().currentUser.displayName}
          </label>

          <div className="dropdown">
            <img alt="more" className="dot" src="../images/dot.png" width="8px" />
            <div className="dropdown-content">
              <Link className="logout" to="/logout">
                çıkış yap
              </Link>
              <Link className="logout" to={"/profile/"+firebase.auth().currentUser.uid}>
                profil
              </Link>
            </div>
          </div>

        </div>
      </div>
      {/* =========== FELSEFE MENÜSÜ ============ */}

    </div>
  );}
};

export default Header;

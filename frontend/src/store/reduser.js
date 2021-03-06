//
//
// REDUX DATA
//
//

//Api URL (need changing on prodaction)
const uri = 'http://localhost:8000'

//Default Redux data
const initialState = {
  //Theme default colors
    mainColor:{
      color: "#11998E",
      mainBack: "#fff",
      smallBack: "#e6e6e6",
      textColor: "#000",
      genres: "#D3F6F0"
    },
    //Api links
    apiLinks: {
      mainLink: uri,
      manga: uri +"/api/v1/manga/",
      news:  uri +"/api/v1/news/",
      tags:  uri +"/api/v1/tag/",
      chapters: uri +"/api/v1/chapter/",
      tokenCheck: uri +"/api/v1/token/check",
      tokenRefresh: uri +"/api/v1/refresh/",
      tokenGetter: uri +"/api/v1/token/",
      userInfo: uri +"/api/v1/userinfo/",
      userCreate: uri +"/api/v1/create/"
    }
}

const reduser = (state = initialState, action) => {
    const newState = {...state}
    //Switcher which recive commands and change REDUX data
    switch (action.type) {
      //Change light and dark theme
        case "CHANGE_COLOR":
            const darkColor = {
              color: "#B52556",
              mainBack: "#000",
              smallBack: "#1F1F1F",
              textColor: "#fff",
              genres: "#a63350"
            }
            const lightColor = {
              color: "#11998E",
              mainBack: "#fff",
              smallBack: "#e6e6e6",
              textColor: "#000",
              genres: "#D3F6F0"
            }
            action.status ? newState.mainColor = darkColor : newState.mainColor = lightColor
            break;

        default:
          break;
    }

    return newState
}

export default reduser
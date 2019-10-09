import orange from "@material-ui/core/colors/orange";
import blueGrey from "@material-ui/core/colors/blueGrey";

export default {
  palette: {
    primary: {
      light: blueGrey[800],
      main: blueGrey[900],
      contrastText: '#f4db9d'
    },
    secondary: {
      light: orange[400],
      main: orange[500],
      dark: orange[600],
      contrastText: '#000000'
    }
  },
  themeMinusPalette: {
    typography: {
      useNextVariants: true
    },
    form: {
      textAlign: "center"
    },
    image: {
      margin: "0 auto"
    },
    pageTitle: {
      margin: "0 auto 10px auto"
    },
    displayLinebreaks: {
      whiteSpace: "pre-wrap"
    },
    textField: {
      margin: "10px auto 10px auto",
      textAlign: "center",
      padding: "0 16px"
    },
    button: {
      margin: "20px auto",
      width: "200px",
      position: "relative"
    },
    customError: {
      color: "red",
      fontSize: "0.8rem",
      marginTop: "10px"
    },
    customMessage: {
      color: "#ff9800",
      fontSize: "1rem",
      marginTop: "10px"
    },
    progress: {
      position: "absolute"
    }
  }
};

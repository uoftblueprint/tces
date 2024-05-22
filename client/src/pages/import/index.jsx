import PropTypes from "prop-types";
import ImportComponent from "../../components/import-component";

function Import({ setSnackBarMessage }) {
  return <ImportComponent setSnackBarMessage={setSnackBarMessage} />;
}

Import.propTypes = {
  setSnackBarMessage: PropTypes.func.isRequired,
};

export default Import;

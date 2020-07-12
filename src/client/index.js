import {validateProcess} from "./js/application";
import {updateUI} from "./js/application";
import "bootstrap";
import "./styles/main.scss";

document.getElementById('form-submit').addEventListener('click', validateProcess)

export{validateProcess};

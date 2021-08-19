import {withAuth} from "../../utils";
import Description from "../../components/description";

function Registries(){
    return(
        <Description title="Cadastro de cidadão" desc="Preencha as informações necessárias para cadastrar um cidadão."/>
    )
}
export default withAuth(Registries)

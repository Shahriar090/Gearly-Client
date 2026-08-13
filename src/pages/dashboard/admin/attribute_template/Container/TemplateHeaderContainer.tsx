import useTemplateHeader from "../hooks/useTemplateHeader";
import TemplateHeaderPresenter from "../Presenter/TemplateHeaderPresenter";

const TemplateHeaderContainer = () => {
  const presenterProps = useTemplateHeader();

  return <TemplateHeaderPresenter {...presenterProps} />;
};

export default TemplateHeaderContainer;

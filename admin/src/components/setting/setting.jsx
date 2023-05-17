import React, { Component } from "react";
import { withTranslate } from "react-redux-multilingual";
import { respons } from "../../servises";
import ImageUploading from "react-images-uploading";
import { Editor } from "@tinymce/tinymce-react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export class setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameSite: "",
      editorContent: "",
      // logo: null,
      ErrorNameSite: false,
      // ErrorLogoSite: false,
    };
    this.changeVar = this.changeVar.bind(this);
    // this.onDrop = this.onDrop.bind(this);
    this.setEditorContent = this.setEditorContent.bind(this);
  }

  changeVar(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  /* onDrop(picture) {
    this.setState({
      logo: picture,
    });
  }*/
  setEditorContent = (content) => {
    this.setState({ editorContent: content });
  };
  componentDidMount = async () => {
    (async () => {
      let lan = "en";
      if (
        localStorage.getItem("locale") !== "undefined" &&
        localStorage.getItem("locale") !== null
      ) {
        lan = localStorage.getItem("locale");
      }
      const [result] = await Promise.all([
        respons(
          "get",
          "/setting?" + new URLSearchParams({ language: lan })
        ).then((data) => data),
      ]);

      this.setState({
        nameSite: result[0].siteName,
        editorContent: result[0].about,
      });
    })();
  };

  render() {
    let languages = "en";
    if (
      localStorage.getItem("locale") !== "undefined" &&
      localStorage.getItem("locale") !== null
    ) {
      languages = localStorage.getItem("locale");
    }
    let languageTinyUrl =
      languages === "en" ? null : "/public/tincy/uk/langs/uk.js";
    let localeTiny = languages === "en" ? null : "uk";
    const { translate } = this.props;
    const editortRef = React.createRef();
    const { ErrorNameSite, ErrorLogoSite } = this.state;

    const response = (query) => {
      const body = {
        SiteName: this.state.nameSite,
        about: this.state.editorContent,
        language: languages,
      };

      respons("put", "/setting", JSON.stringify(body)).then((res) => {
        console.log(res.warningCount);
        if ((res.warningCount = 0)) {
          toast.error(translate("aboutSettingError"));
          return;
        } else {
          toast.success(translate("aboutSettingUpdate"));
        }
      });
    };

    return (
      <div className="setting-main m-4">
        <ToastContainer />
        <div className="d-flex justify-content-end">
          <button className="btn btn-success" onClick={response}>
            {translate("SaveSetting")}
          </button>
        </div>
        <div className="my-3">
          <span>{translate("NameSite")}</span>
          <input
            type="text"
            name="nameSite"
            value={this.state.nameSite}
            maxLength={50}
            onChange={this.changeVar}
            className="form-control"
          />
          {ErrorNameSite && (
            <span className="text-danger">
              {translate("error_RequireLogin")}
            </span>
          )}
          <div className="mt-4 mb-5 pb-5">
            <span>{translate("AboutUs")}</span>
            <Editor
              apiKey={process.env.TinyApi}
              init={{
                language: localeTiny,
                language_url: languageTinyUrl,
                fontsize_formats:
                  "8px=0.5rem 10px=0.625rem 12px=0.75rem 14px=0.875rem 16px=1rem 18px=1.125rem 24px=1.5rem 36px=2.25rem 48px=3rem",
                formats: {
                  strikethrough: {
                    inline: "span",
                    styles: { "text-decoration": "line-through" },
                  },
                },
              }}
              onInit={(evt, editor) => (editortRef.current = editor)}
              value={this.state.editorContent}
              onEditorChange={this.setEditorContent}
            />
          </div>
          {/*
          <ImageUploading
            value={this.logo}
            onChange={this.onDrop}
            withIcon={false}
            buttonText={translate("Upload")}
            imgExtension={[".jpg", ".png", ".svg"]}
            maxFileSize={5242880}
            singleImage={true}
          />
          {ErrorLogoSite && (
            <span className="text-danger">
              {translate("error_RequireLogin")}
            </span>
          )}
          */}
        </div>
      </div>
    );
  }
}

export default withTranslate(setting);

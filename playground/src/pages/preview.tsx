import Headlines from "./headlines";
function Preview(msg: any) {
  const t = JSON.stringify(msg, null, 2);
  console.log(t);
  return (
    <div className="preview-box">
      <Headlines heading="preview" subheading=""></Headlines>
      <p>{t}</p>
     
    </div>
  );
}

export default Preview;

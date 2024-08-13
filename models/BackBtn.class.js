class BackBtn {
  imgSrc;
  id;
  onclick;

   /**
   * Constructs a new instance of the constructor.
   *
   * @param {Object} parent - the parent element
   * @param {string} id - the ID of the element
   * @param {function} onclick - the click event handler
   * @return {undefined}
   */
  constructor(parent, id, onclick) {
    this.id=`${id}-back-btn`;
    this.imgSrc = "../assets/img/icon-arrow-left-line-blue.png";

    new Button(parent, this.id, "signup-back-btn", onclick);
    new Img(this.id, undefined, undefined, this.imgSrc);
  }
}

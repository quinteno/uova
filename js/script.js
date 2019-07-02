const spaceId = "p74bav3vjhg5";
const environmentId = "master";
const accessToken = "1nvYI_GaZntslyhArfqExyNM0LJlIQp8SuDcqVBQpx4";

const url = `https://cdn.contentful.com
/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&order=fields.order&content_type=menuItem`;

const sectionTag = document.querySelector("section.grid");

const grabData = () => {
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      // Store the assets somewhere.
      const assets = data.includes.Asset;

      // Turn our Contentful data into something more useful.
      return data.items.map(item => {
        let imageUrl = "assets/image1.jpg";

        const imageId = item.fields.image.sys.id;

        const imageData =  assets.find(asset => {
          return asset.sys.id == imageId;
        })

        if (imageData) {
          imageUrl = imageData.fields.file;

          let appendHttp = "http:" + imageUrl.url;
          imageUrl = appendHttp;
        }

        item.fields.image = imageUrl;
        return item.fields;
      });
    })
}

// Run this grabData function on load.
grabData().then(data => {
  // In here, do something with the returned data.
  console.log(data);

  // Remove the loader.
  sectionTag.innerHTML = "";

  data.forEach(item => {
    sectionTag.innerHTML = sectionTag.innerHTML + `
      <div class="item">
        <img src="${item.image}">
        <div class="title">
          <h2>${item.title}</h2>
          <p>${item.price}</p>
        </div>
        <p>${item.description}</p>
      </div>
    `;
  })
});


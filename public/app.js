axios.get('/notice')
.then(function (response) {
  const element = document.getElementById('data-entry');
  // console.log(response.data);
  const gazette_res=response.data;
  if(gazette_res['entry']){
    const entry=gazette_res['entry'];
    const htmlString = getCard(entry);
    // Create a new range object & Set the start position of the range to the end of the element
    const range = document.createRange();
    range.setStartAfter(element);
    // Parse the HTML string into a DocumentFragment
    const fragment = range.createContextualFragment(htmlString);
    // Add the fragment to the element's inner HTML
    element.appendChild(fragment);
  }
  else{
    console.error('Error retrieving entries');
    element.innerHTML='<h2>Error retrieving entries</h2>';
  }
})
.catch(function (error) {
  console.log(error);
});
function getCard(entry){
  let card=`<div class="all-cards">`;
  entry.forEach((item) => {
    card += '<div class="notice mb-lg-5">';
    if(item.id && item.title)  
      card += `<header class="notice__title"><h2><a href="${item.id}" class="notice__link">${item.title}</a></h2></header>`;
    if(item.published)  
      card += `<div name="publishedDate" class="notice__date"><time datetime="${item.published}">${formatDate(item.published)} </time></div>`;
    if(item.content)
      card += `<section class="notice__content">${item.content}</section>`;
    card += `</div>`;
  });
  card += '</main>';
  return card;
}
function formatDate(d){
  if(d){
    let d_obj=new Date(d);
    let d_string=d_obj.toLocaleDateString('en-GB', {day: 'numeric', month:"long", year: 'numeric' });
    return(d_string);
  }
}

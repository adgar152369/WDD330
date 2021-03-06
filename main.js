const orderedList = document.querySelector('.ol1');

const links = [
    {
        label: "Week01 notes",
        url: "week01/index.html"
    },
    {
        label: "Week02 notes",
        url: "week02/index.html"
    },
    {
        label: "Week04 notes",
        url: "week04/index.html"
    },
    {
        label: "Week05 notes",
        url: "week05/index.html"
    },
    {
        label: "ToDo App",
        url: "todoApp/index.html"
    },
    {
        label: "Week07",
        url: "week07/index.html"
    },
    {
        label: "Week08",
        url: "week08/index.html"
    },
    {
        label: "Week09",
        url: "week09/index.html"
    },
    {
        label: "Week10",
        url: "week10/index.html"
    },
    {
        label: "Rexipes App",
        url: "RexipesApp/index.html"
    }
];

// loop through each item in list
for (let link in links) {
    console.log(`${links[link].label}`)
    //create new elements
    let li = document.createElement('li');
    let a = document.createElement('a');

    // add url to href for each link
    a.innerHTML = links[link].label;
    a.href = links[link].url;
    a.target ='_blank';
    console.log(a);

    li.appendChild(a);
    console.log(li);

    orderedList.appendChild(li);
}
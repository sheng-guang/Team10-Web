var all=[];

re={}
re.title="story1 ";
re.description="description1"
re.picture="";
re.author="author1"
all.push(re);


re2={}
re2.title="story2";
re2.description="//description2  //description2   //description2  //description2  //description2  //description2  //description2  "
re2.picture="";
re2.author="author2";

all.push(re2);

function getAllStory(){
    return all;
}

function addNewStory(title,picture,description,author){
    var ne={};
    ne.title=title;
    ne.picture=picture;
    ne.description=description;
    ne.author=author;
    all.push(ne);
}

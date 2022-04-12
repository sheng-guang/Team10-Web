var all=[];

re={}
re.title="story1";
re.description="description1"
re.picture="";
re2={}
re2.title="story2";
re.description="description2"
re.picture="";
all.push(re);

all.push(re2);

function getAllStory(){
    return all;
}

function addNewStory(title,picture,description){
    var ne={};
    ne.title=title;
    ne.picture=picture;
    ne.description=description;
    all.push(ne);
}
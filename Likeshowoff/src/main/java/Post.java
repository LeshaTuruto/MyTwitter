import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Post {
    private String id;
    private String description;
    private String createdAt;
    private String author;
    private String photoLink;
    private List<String> hashTags;
    private List<String> likes;
    public Post(){
        this.id="";
    }
    public Post(String id, String description,String createdAt, String author, String photoLink, String hashTags, String likes)
    {
        this.id = id;
        this.description = description;
        this.createdAt =createdAt;
        this.author = author;
        this.photoLink = photoLink;
        this.hashTags=new ArrayList<String>();
        this.likes=new ArrayList<String>();
        Pattern pattern=Pattern.compile(".+?,");
        Matcher matcher1=pattern.matcher(hashTags);
        while(matcher1.find()) {
            this.hashTags.add(matcher1.group().replace(",",""));
        }
        Matcher matcher2=pattern.matcher(likes);
        while (matcher2.find()){
            this.likes.add(matcher2.group().replace(",",""));
        }
    }
    public Post(Post post){
        this.id = post.id;
        this.description = post.description;
        this.createdAt =post.createdAt;
        this.author = post.author;
        this.photoLink = post.photoLink;
        this.hashTags=new ArrayList<String>(post.hashTags);
        this.likes=new ArrayList<String>(post.likes);
    }
    public Post(String description,String hashtags,String photoLink,String author){
        this.hashTags=new ArrayList<>();
        this.description=description;
        this.photoLink=photoLink;
        Pattern pattern=Pattern.compile(".+?,");
        Matcher matcher1=pattern.matcher(hashtags);
        while(matcher1.find()) {
            this.hashTags.add(matcher1.group().replace(",",""));
        }
        this.likes=new ArrayList<>();
        this.author=author;

    }
    public Post(String description,String hashtags, String photoLink){
        this.hashTags=new ArrayList<>();
        this.description=description;
        this.photoLink=photoLink;
        Pattern pattern=Pattern.compile(".+?,");
        Matcher matcher1=pattern.matcher(hashtags);
        while(matcher1.find()) {
            this.hashTags.add(matcher1.group().replace(",",""));
        }
    }
    public void setId(String id) {
        this.id = id;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setPhotoLink(String photoLink) {
        this.photoLink = photoLink;
    }
    public void setHashTags(List<String>hashTags){
        this.hashTags=new ArrayList<>(hashTags);
    }
    public String getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public String getAuthor() {
        return author;
    }

    public String getPhotoLink() {
        return photoLink;
    }

    public List<String> getHashTags() {
        return hashTags;
    }

    public List<String> getLikes() {
        return likes;
    }

    public String toString(){
        StringBuffer strbuf=new StringBuffer();
        strbuf.append(id+"\n");
        strbuf.append(author+"\n");
        strbuf.append(createdAt.toString()+"\n");
        strbuf.append(description+"\n");
        if(photoLink!=null){
            strbuf.append(photoLink+"\n");
        }
        if(hashTags.size()!=0){
            strbuf.append(hashTags.toString()+"\n");
        }
        if(likes.size()!=0){
            strbuf.append(likes.toString());
        }
        return strbuf.toString();
    }

}

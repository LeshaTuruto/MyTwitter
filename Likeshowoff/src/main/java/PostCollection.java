import java.io.PrintWriter;
import java.sql.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.ResourceBundle;

public class PostCollection {
    List<Post> list;
    PostCollection(){
        list=new ArrayList<Post>();

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/likeshowoff?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC","root","Password");
            Statement stat=conn.createStatement();
            ResultSet rs=stat.executeQuery("SELECT * FROM likeshowoff.posts");
            while (rs.next()){
                Statement stat1=conn.createStatement();
                String str="SELECT * FROM likeshowoff.users WHERE id=";
                str+=rs.getString("user_id");
                ResultSet rsuser=stat1.executeQuery(str);
                rsuser.next();
                Post post=new Post(rs.getString("id"),rs.getString("post_description"),rs.getString("created_at"),rsuser.getString("username"),rs.getString("photo_link"),rs.getString("hashtags"),rs.getString("likes"));
                list.add(post);
                stat1.close();
            }
            stat.close();
        }
        catch (SQLException | ClassNotFoundException e){
            System.out.println("error");
        }
    }
    public boolean addPost(Post post){

        if(this.validate(post)){
            try {
                Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/likeshowoff?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC","root","Password");
                Statement statt=conn.createStatement();
                ResultSet rss=statt.executeQuery("SELECT * FROM likeshowoff.posts WHERE id=(SELECT MAX(id) FROM likeshowoff.posts)");
                rss.next();
                post.setId(String.valueOf(Integer.parseInt(rss.getString("id"))+1));
                post.setCreatedAt(new Date().toString());
                rss.close();
                list.add(post);
                Class.forName("com.mysql.cj.jdbc.Driver");
                Statement stat=conn.createStatement();
                Statement stat1=conn.createStatement();
                String str1="SELECT * FROM likeshowoff.users WHERE username='";
                str1+=post.getAuthor()+"'";
                String user_id;
                ResultSet rs1=stat1.executeQuery(str1);
                if(rs1.next()){
                    user_id=rs1.getString("id");
                }
                else{
                    Statement stat11=conn.createStatement();
                    ResultSet rs11=stat11.executeQuery("SELECT * FROM likeshowoff.users WHERE id=(SELECT MAX(id) FROM likeshowoff.users)");
                    rs11.next();
                    String str11=rs11.getString("id");
                    String str2=String.valueOf(Integer.parseInt(str11)+1);
                    user_id=str2;
                    String str12="INSERT * likeshowoff.posts (id,name) VALUES (";
                    Statement stat12=conn.createStatement();
                    str12+=str2+",'"+post.getAuthor()+"')";
                    stat12.executeUpdate(str2);
                    rs11.close();
                }
                String str="INSERT likeshowoff.posts (id,user_id,post_description,photo_link,hashtags,likes,created_at) VALUES (";
                StringBuffer hashtags=new StringBuffer(post.getHashTags().toString());
                StringBuffer likes=new StringBuffer(post.getLikes().toString());
                likes.deleteCharAt(0);
                likes.deleteCharAt(likes.length()-1);
                hashtags.deleteCharAt(0);
                hashtags.deleteCharAt(hashtags.length()-1);
                str+=post.getId()+",'"+user_id+"','"+post.getDescription()+"','"+post.getPhotoLink()+"','"+hashtags.toString()+"','"+likes.toString()+"','"+post.getCreatedAt()+"')";
                stat.executeUpdate(str);
                rs1.close();
            }
            catch (SQLException | ClassNotFoundException e){
                System.out.println("error");
            }
            return true;
        }
        return false;
    }
    private boolean validate(Post post){
        if(post.getDescription().length()>200||post.getHashTags().size()>30){
            return false;
        }
        return true;
    }
    public Post getPost(String id){
        for(int i=0;i<list.size();i++){
            if(list.get(i).getId().equals(id)){
               return list.get(i);
            }
        }
        Post nullpost=new Post();
        return nullpost;
    }
    public boolean edit(String id,Post editionpost){
        Post editedpost=new Post();
        int num=0;
        int t=0;
        for(int i=0;i<list.size();i++){
            if(list.get(i).getId().equals(id)){
                editedpost=new Post(list.get(i));
                num=i;
                t=1;
                break;
            }
        }
        if (t==0||this.validate(editionpost)==false){
            return false;
        }
        editedpost.setDescription(editionpost.getDescription());
        editedpost.setPhotoLink(editionpost.getPhotoLink());
        editedpost.setHashTags(editionpost.getHashTags());
        list.set(num,editedpost);
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/likeshowoff?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC", "root", "password");
            Statement stat = conn.createStatement();
            String str="UPDATE likeshowoff.posts SET post_description=";
            StringBuffer hashtags=new StringBuffer(editionpost.getHashTags().toString());
            hashtags.deleteCharAt(0);
            hashtags.deleteCharAt(hashtags.length()-1);
            str+="'"+editionpost.getDescription()+"',"+" photo_link='"+editionpost.getPhotoLink()+"',"+" hashtags="+"'"+hashtags.toString()+"'"+" WHERE id="+id;
            stat.executeUpdate(str);
        }catch (SQLException |ClassNotFoundException e){
            System.out.println("error");
        }
        return true;
    }
    /*public List<Post> getPage(int skip,int top,Post filterConfig){
        List<Post> returnPosts=new ArrayList<>();
        if(skip>=list.size()){
            return returnPosts;
        }
        if(skip+top>list.size()){
         top=list.size();
        }
        for(int i=skip;i<top;i++){
            if(filterConfig.getHashTags().size()==0){
                if(filterConfig.getPhotoLink().equals(null)){
                    if(filterConfig.getAuthor().equals(null)){
                        returnPosts.add(list.get(i));
                    }
                    else{
                        if(list.get(i).getAuthor().equals(filterConfig.getAuthor())){
                            returnPosts.add(list.get(i));
                        }
                    }
                }
                else{

                }
            }
        }
    }*/
    public boolean remove(String id){
        int t=0;
        for(int i=0;i<list.size();i++){
            if(list.get(i).getId().equals(id)){
                list.remove(i);
                try {
                    Class.forName("com.mysql.cj.jdbc.Driver");
                    Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/likeshowoff?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC", "root", "password");
                    Statement stat=conn.createStatement();
                    stat.executeUpdate("DELETE FROM likeshowoff.posts WHERE id="+id);
                }
                catch (ClassNotFoundException|SQLException e){
                    System.out.println("error");
                }
                return true;
            }
        }
        return false;
    }
}

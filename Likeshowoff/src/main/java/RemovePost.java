import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "RemovePost")
public class RemovePost extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PostCollection posts=new PostCollection();
        boolean b=posts.remove(request.getParameter("id"));
        if(b){
            response.getOutputStream().println("success");
        }
        else{
            response.getOutputStream().println("Notsuccess");
        }
    }
}
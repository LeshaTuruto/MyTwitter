import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@WebFilter(filterName = "Filter")
public class Filter implements javax.servlet.Filter {
    public void destroy() {
    }

    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {
        long start=System.currentTimeMillis();
        chain.doFilter(req, resp);
        long end=System.currentTimeMillis();
        HttpServletRequest httprequest=(HttpServletRequest)req;
        String path=httprequest.getRequestURI();
        String method=httprequest.getMethod();
        System.out.println(String.format("%s '%s' - done (%d ms)", method ,path, end - start));
    }

    public void init(FilterConfig config) throws ServletException {

    }

}

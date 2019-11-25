package ru.yellowblacksnek.beans;

import org.hibernate.Session;
import ru.yellowblacksnek.db.HibernateSessionFactory;

import javax.faces.bean.ManagedBean;
import java.util.List;

@ManagedBean
public class Collection {
    public List<Point> getPoints(){
        Session session = HibernateSessionFactory.getSessionFactory().openSession();
        List<Point> points = session.createCriteria(Point.class).list();
        return points;
    }

    public void setPoints(List<Point> points) {}

}

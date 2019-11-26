package ru.yellowblacksnek.beans;

import org.hibernate.Session;
import ru.yellowblacksnek.db.HibernateSessionFactory;

import javax.persistence.criteria.CriteriaQuery;
import java.util.List;

public class Collection {
    public List<Point> getPoints(){
        Session session = HibernateSessionFactory.getSessionFactory().openSession();

        CriteriaQuery<Point> criteriaQuery = session.getCriteriaBuilder().createQuery(Point.class);
        criteriaQuery.from(Point.class);

        List<Point> points = session.createQuery(criteriaQuery).getResultList();
        return points;
    }

    public void setPoints(List<Point> points) {}

}

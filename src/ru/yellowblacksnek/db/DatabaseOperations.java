package ru.yellowblacksnek.db;

import org.hibernate.Session;
import org.hibernate.Transaction;

import ru.yellowblacksnek.beans.Point;

import java.util.List;

public class DatabaseOperations {

    public String addResultInDb(PointEntity point) {
        String debug = new String();

        Transaction trans=null;
        Session session=HibernateSessionFactory.getSessionFactory().openSession();
        try
        {
            boolean unique = true;
            List<PointEntity> points = session.createCriteria(PointEntity.class).list();
            debug = point.toString() + '\n' + points.toString();
            for(PointEntity p : points) {
                System.out.println(p);
                if(p.equals(point)) {
                    unique = false;
                    break;
                }
            }
            if(unique) {
                trans = session.beginTransaction();
                session.save(point);
                trans.commit();
            }
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
        session.close();
        return debug;
    }
}

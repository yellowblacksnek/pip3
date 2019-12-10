package ru.yellowblacksnek.beans;

import ru.yellowblacksnek.AreaUtils;
import ru.yellowblacksnek.db.DatabaseOperations;
import ru.yellowblacksnek.db.PointEntity;

import javax.ejb.EJB;
import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.ValidatorException;
import java.io.Serializable;
import java.util.Objects;

public class Point implements Serializable {
    private int id;
    private String x;
    private String y;
    private String r;
    private Boolean match;

    public String getX() {
        return x;
    }

    public void setX(String x) {
        this.x = x;
    }

    public String getY() {
        return y;
    }

    public void setY(String y) {
        this.y = y;
    }

    public String getR() {
        return r;
    }

    public void setR(String r) {
        this.r = r;
    }

    public Boolean getMatch() {
        return match;
    }

    public void setMatch(Boolean match) {
        this.match = match;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Point that = (Point) o;
        return  Objects.equals(x, that.x) &&
                Objects.equals(y, that.y) &&
                Objects.equals(r, that.r) &&
                Objects.equals(match, that.match);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, x, y, r, match);
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public String getToString() {
        return toString();
    }
    public void setToString(String str) {}

    @Override
    public String toString() {
        return ""+ id + x + y + r + match;
    }

    @EJB
    private DatabaseOperations dbObj;

    public void save() {
        Double x = Double.parseDouble(this.x.replace(',','.')) / Double.parseDouble(this.r.replace(',','.'));
        Double y = Double.parseDouble(this.y.replace(',','.')) / Double.parseDouble(this.r.replace(',','.'));
        double realX = x*70+100;
        double realY = -y*70+100;
        this.match = (
                AreaUtils.arc.contains(x,y) ||
                AreaUtils.poly.contains(realX,realY) ||
                AreaUtils.rect.contains(realX,realY));
        PointEntity pEntity = new PointEntity(this.x, this.y, this.r, this.match);
        dbObj.addResultInDb(pEntity);
    }
//    private static final int[] possibleR = {1, 2, 3, 4, 5};
//    public void validateR(FacesContext context, UIComponent component, Object value) throws ValidatorException {
//        String msg = "Неверное значение радиуса!";
//        Integer r = null;
//        try {
//            r = Integer.parseInt((String) value);
//        } catch (Exception e) {
//        }
//        if (r == null) {
//            throw new ValidatorException(new FacesMessage(FacesMessage.SEVERITY_ERROR, msg, msg));
//        }
//        boolean contains = false;
//        for(int i = 0; i < possibleR.length; ++i) {
//            if(r == possibleR[i]) {
//                contains = true;
//                break;
//            }
//        }
//        if (!contains) {
//            throw new ValidatorException(new FacesMessage(FacesMessage.SEVERITY_ERROR, msg, msg));
//        }
//
//    }

    public void validateY(FacesContext context, UIComponent component, Object value) throws ValidatorException {
        String msg = "Недопустимое значение Y!";
        Double y = null;
        try {
            y = Double.parseDouble(((String) value).replace(',', '.'));
        } catch (Exception e) {
        }
        if (y == null || y < -8 || y > 8) {
            throw new ValidatorException(new FacesMessage(FacesMessage.SEVERITY_ERROR, msg, msg));
        }
    }
}

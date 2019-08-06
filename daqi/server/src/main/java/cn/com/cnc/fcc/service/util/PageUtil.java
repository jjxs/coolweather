package cn.com.cnc.fcc.service.util;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * 分页工具类
 * @author DL0777
 * @version v1.0.0
 */
@Service
public class PageUtil {
    public <T> Page<T> listToPage(List<T> list, Pageable pageable) {
        if(list == null)
        {
            list = new ArrayList<T>();
        }
        int start = (int)pageable.getOffset();
        int end = (start + pageable.getPageSize()) > list.size() ? list.size() : ( start + pageable.getPageSize());
        if (start > end) {
            return new PageImpl<>(new ArrayList<T>(), pageable, list.size());
        } else {
            return new PageImpl<>(list.subList(start, end), pageable, list.size());
        }
    }
}

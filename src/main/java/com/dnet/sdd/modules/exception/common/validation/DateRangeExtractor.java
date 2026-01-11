package com.dnet.sdd.modules.exception.common.validation;

import java.time.LocalDate;

public interface DateRangeExtractor<T> {

    String getPersonNo(T record);

    LocalDate getFromDate(T record);

    LocalDate getToDate(T record);
}
